import * as fs from 'fs';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import { BigNumber, ethers } from 'ethers';
import * as path from 'path';
type Input =
  | string
  | number
  | bigint
  | Uint8Array
  | Array<Input>
  | null
  | undefined
  | boolean
  | (string | BigNumber)[][]
  | (string | BigNumber)[]
  | bigint
  | BigNumber;
/* If string supplied is prefixed with '0x' remove it and return the new string */
function stripHexPrefix(input: string): string {
  if (input.startsWith('0x')) {
    input = input.slice(2);
  }

  return input;
}

/* Convert a hexadecimal string to an array of hexadecimal byte values (in preparation of inserting into a byte array) */
function hexStringToByteArr(input: string): Uint8Array {
  input = stripHexPrefix(input);

  let arr: string[] = [];

  if (input.length % 2 === 0) {
    // if even number of hex digits -> input doesn't require prefixing for splitting into hex byte values
    /* eslint-disable-next-line */
    arr = input.match(/.{1,2}/g)! as string[];
  } else {
    // if odd number of hex digits -> prefix with 0 digit before splitting into hex byte values
    /* eslint-disable-next-line */
    arr = ('0' + input).match(/.{1,2}/g)! as string[];
  }

  // Convert hexadecimal value array to decimal value array
  const decimalArr = arr.map((h) => parseInt(h, 16));

  // Create byte array from decimal value array
  return Uint8Array.from(decimalArr);
}

function encode(input: Input): Uint8Array {
  /* (1) Non-value input */
  if (input === '' || input === false || input === null) {
    const value = parseInt('0x80', 16);
    return Uint8Array.from([value]);
  }

  //   /* (2) Empty list input */
  //   if (input === []) {
  //     const value = parseInt('0xc0', 16);
  //     return Uint8Array.from([value]);
  //   }

  /* For decimal value inputs */
  if (typeof input === 'number') {
    if (input < 0) {
      throw new Error(
        'Integer must be unsigned (provide decimal value greater than or equal to 0'
      );
    }

    if (input === 0) {
      const value = parseInt('0x80', 16);
      return Uint8Array.from([value]);
    }

    /* (3) A single byte with value within range [0x00, 0x7f] as input */
    if (input <= 127) {
      return Uint8Array.from([input]);
    }

    if (input > 127) {
      const hexStr = input.toString(16);
      const byteArr = hexStringToByteArr(hexStr);
      const first = parseInt('0x80', 16) + byteArr.length;
      return Uint8Array.from([first, ...byteArr]);
    }
  }

  /* true boolean input */
  if (input === true) {
    const value = parseInt('0x01', 16);
    return Uint8Array.from([value]);
  }

  /* For hexadecimal strings prefixed by '0x' */
  if (typeof input === 'string' && input.startsWith('0x')) {
    const payload = stripHexPrefix(input);

    // If odd number of digits in hexadecimal string -> append '0' prefix
    const padded = payload.length % 2 === 0 ? payload : '0' + payload;
    // Create array of hex values where each element is prefixed by '0x' (we do this so byte array can convert these hex values to decimal byte values in the return statement)
    /* eslint-disable-next-line */
    const hexArr: any[] = padded.match(/.{1,2}/g)!.map((x) => '0x' + x);

    // This is for hexadecimal strings with length greater than 55 bytes
    if (hexArr.length > 55) {
      const lengthInHex = hexArr.length.toString(16);
      const bytesToStoreLengthInHex = hexStringToByteArr(lengthInHex);
      const first = parseInt('0xb7', 16) + bytesToStoreLengthInHex.length;
      return Uint8Array.from([first, ...bytesToStoreLengthInHex, ...hexArr]);
    }

    const first = parseInt('0x80', 16) + hexArr.length;
    return Uint8Array.from([first, ...hexArr]);
  }

  /* (4) Input is string with length of 1 byte */
  if (typeof input === 'string' && input.length === 1) {
    const value = input.charCodeAt(0);
    return Uint8Array.from([value]);
  }

  /* (5) Input is string between 2-55 bytes in length */
  if (typeof input === 'string' && input.length <= 55) {
    const first = parseInt('0x80', 16) + input.length;
    const encoded = input.split('').map((c) => c.charCodeAt(0));

    return Uint8Array.from([first, ...encoded]);
  }

  /* (6) Input is string greater than 55 bytes in length */
  if (typeof input === 'string' && input.length > 55) {
    const lengthInHex = stripHexPrefix(input).length.toString(16);
    const bytesToStoreLengthInHex = hexStringToByteArr(lengthInHex);

    const first = parseInt('0xb7', 16) + bytesToStoreLengthInHex.length;
    const encoded = input.split('').map((c) => c.charCodeAt(0));

    return Uint8Array.from([first, ...bytesToStoreLengthInHex, ...encoded]);
  }

  if (Array.isArray(input)) {
    const encoded = [];
    let encodedLength = 0;

    for (const item of input) {
      const enc = encode(item);
      encoded.push(...enc);
      encodedLength += enc.length;
    }

    /* (7) Input is list with the sum of its RLP-encoded contents being between 1–55 bytes  */
    if (encodedLength <= 55) {
      const first = parseInt('0xc0', 16) + encodedLength;
      return Uint8Array.from([first, ...encoded]);
    }

    /* (8) Input is list with the sum of its RLP-encoded contents being greater than 55 bytes */
    if (encodedLength > 55) {
      const lengthInHex = encodedLength.toString(16);
      const bytesToStoreLengthInHex = hexStringToByteArr(lengthInHex);

      const first = parseInt('0xf7', 16) + bytesToStoreLengthInHex.length;
      return Uint8Array.from([first, ...bytesToStoreLengthInHex, ...encoded]);
    }
  }

  throw new Error(
    'Unhandled input payload (if bigint payload, then encode method requires an update) - no encoding scheme available (perhaps stringify or encode as a list)'
  );
}
function generateStandardInput() {
  let rewards = [];
  const proofs = [];
  const leaves = [3, 6, 8, 13, 16, 34, 45, 67, 87, 92];
  for (let i = 0; i < 100; i++) {
    rewards.push([
      ethers.Wallet.createRandom().address,
      BigNumber.from('10000000000000000000')
    ]);
  }

  const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
  rewards = rewards.map((x) => {
    x[1] = x[1].toString();
    return x;
  });
  const encodedRewardsData = encode(rewards);
  for (let i = 0; i < leaves.length; i++) {
    proofs.push(tree.getProof(leaves[i]));
  }
  const encodedProofs = encode(proofs);
  if (!fs.existsSync(path.resolve(__dirname + '/data'))) {
    fs.mkdirSync(path.resolve(__dirname + '/data'));
  }
  const rewardsDatahex = Buffer.from(encodedRewardsData).toString('hex');
  const proofsHex = Buffer.from(encodedProofs).toString('hex');
  // console.log(rewardsDatahex);
  // console.log(encodedRewardsData);
  // console.log(rewardsDatahex);
  // console.log(leavesHex);
  // console.log(tree.root);
  fs.writeFileSync(path.resolve(__dirname + '/data/root.txt'), tree.root);
  fs.writeFileSync(
    path.resolve(__dirname + '/data/data_serialized.txt'),
    rewardsDatahex
  );
  fs.writeFileSync(
    path.resolve(__dirname + '/data/proofs_serialized.txt'),
    proofsHex
  );
  fs.writeFileSync(
    path.resolve(__dirname + '/data/tree.json'),
    JSON.stringify(tree.dump())
  );
}

generateStandardInput();
