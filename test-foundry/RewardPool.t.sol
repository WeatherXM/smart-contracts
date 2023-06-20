// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { Vm } from "forge-std/Vm.sol";
import { DSTest } from "ds-test/test.sol";
import { Test } from "forge-std/Test.sol";
//solhint-disable-next-line no-console
import { console } from "forge-std/console.sol";
import { WeatherXM } from "src/WeatherXM.sol";
import { WeatherXMMintingManager } from "src/WeatherXMMintingManager.sol";
import { RewardPool } from "src/RewardPool.sol";
import { RewardPoolV2 } from "src/mocks/utils/RewardPoolV2.test.sol";
import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import { IWeatherXM } from "src/interfaces/IWeatherXM.sol";
import { IRewardPool } from "src/interfaces/IRewardPool.sol";
import { IWeatherXMMintingManager } from "src/interfaces/IWeatherXMMintingManager.sol";
import { RLPReader } from "solidity-rlp/RLPReader.sol";
import { Merkle } from "murky/Merkle.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

bytes32 constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");

contract RewardPoolTest is Test {
  address internal tokenImplementation;
  IRewardPool public rewardImplementation;
  IWeatherXM public weatherXM;
  address internal alice;
  address internal bob;
  address internal owner;
  ERC1967Proxy public proxy;
  RewardPool public wrappedProxyV1;
  RewardPoolV2 public wrappedProxyV2;

  ERC1967Proxy public mintingManagerProxy;
  WeatherXMMintingManager public mintingManager;
  // RewardPoolV2 public mintingManagerWrappedProxyV2;

  bytes32 root;
  Merkle m;
  bytes32[100] data;
  bytes resultData;
  bytes resultProofs;
  bytes resultRoot;
  using RLPReader for RLPReader.RLPItem;
  using RLPReader for RLPReader.Iterator;
  using RLPReader for bytes;
  uint8[10] leaves = [3, 6, 8, 13, 16, 34, 45, 67, 87, 92];

  function setUp() external {
    string[] memory inputs = new string[](2);
    inputs[0] = "cat";
    inputs[1] = "test-foundry/scripts/data/data_serialized.txt";
    resultData = vm.ffi(inputs);
    data = abi.decode(resultData, (bytes32[100]));
    string[] memory inputProofs = new string[](2);
    inputProofs[0] = "cat";
    inputProofs[1] = "test-foundry/scripts/data/proofs_serialized.txt";
    resultProofs = vm.ffi(inputProofs);
    string[] memory inputRoot = new string[](2);
    inputRoot[0] = "cat";
    inputRoot[1] = "test-foundry/scripts/data/root.txt";
    resultRoot = vm.ffi(inputRoot);
    root = abi.decode(resultRoot, (bytes32));
    emit log_bytes(resultRoot.toRlpItem().toBytes());
    m = new Merkle();
    mintingManager = new WeatherXMMintingManager();
    tokenImplementation = address(new WeatherXM("WeatherXM", "WXM", address(mintingManager)));
    mintingManager.setToken(tokenImplementation);
    weatherXM = IWeatherXM(tokenImplementation);
    owner = address(0x0);
    vm.label(owner, "Owner");
    alice = address(0x1);
    vm.label(alice, "Alice");
    bob = address(0x2);
    vm.label(bob, "Bob");
    vm.startPrank(owner);
    rewardImplementation = new RewardPool();
    proxy = new ERC1967Proxy(address(rewardImplementation), "");
    wrappedProxyV1 = RewardPool(address(proxy));
    wrappedProxyV1.initialize(tokenImplementation, address(mintingManager));
    vm.stopPrank();
    vm.startPrank(weatherXM.owner());
    vm.stopPrank();
  }

  function testDeployerHasDefaultAdminRole() public {
    assertEq(wrappedProxyV1.hasRole(0x0000000000000000000000000000000000000000000000000000000000000000, owner), true);
  }

  function testCanUpgrade() public {
    vm.startPrank(owner);
    RewardPoolV2 implementationV2 = new RewardPoolV2();
    wrappedProxyV1.upgradeTo(address(implementationV2));
    // re-wrap the proxy
    wrappedProxyV2 = RewardPoolV2(address(proxy));
    assertEq(wrappedProxyV2.version(), "V2");
    vm.stopPrank();
  }

  function testGetRemainingAllocatedRewards() public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    vm.startPrank(owner);
    mintingManager.mintDaily();
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, bob);
    vm.stopPrank();
    vm.startPrank(bob);
    wrappedProxyV1.submitMerkleRoot(root, 100 * 10 ** 18);
    for (uint i = 0; i < leaves.length; ++i) {
      RLPReader.RLPItem[] memory rewards = resultData.toRlpItem().toList();
      RLPReader.RLPItem[] memory proofsEncoded = resultProofs.toRlpItem().toList();
      bytes32[] memory _proof = new bytes32[](proofsEncoded[i].toList().length);
      for (uint j = 0; j < proofsEncoded[i].toList().length; ++j) {
        //  emit log_bytes(proofsEncoded[i].toList()[j].toBytes());
        _proof[j] = bytes32(proofsEncoded[i].toList()[j].toBytes());
      }
      uint256 remainingBalance = wrappedProxyV1.getRemainingAllocatedRewards(
        bytesToAddress(rewards[leaves[i]].toList()[0].toBytes()),
        10000000000000000000,
        1,
        _proof
      );
      assertEq(remainingBalance, 10 * 10 ** 18);
    }
    vm.stopPrank();
  }

  function testThrowWhenInvalidProof() public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    vm.startPrank(owner);
    mintingManager.mintDaily();
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, bob);
    vm.stopPrank();
    vm.startPrank(bob);
    wrappedProxyV1.submitMerkleRoot(root, 100 * 10 ** 18);
    for (uint i = 0; i < leaves.length; ++i) {
      RLPReader.RLPItem[] memory rewards = resultData.toRlpItem().toList();
      RLPReader.RLPItem[] memory proofsEncoded = resultProofs.toRlpItem().toList();
      bytes32[] memory _proof = new bytes32[](proofsEncoded[i].toList().length);
      for (uint j = 0; j < proofsEncoded[i].toList().length; ++j) {
        //  emit log_bytes(proofsEncoded[i].toList()[j].toBytes());
        _proof[j] = bytes32(proofsEncoded[i].toList()[j].toBytes());
      }
      uint256 remainingBalance = wrappedProxyV1.getRemainingAllocatedRewards(
        bytesToAddress(rewards[leaves[i]].toList()[0].toBytes()),
        10000000000000000000,
        1,
        _proof
      );
      assertEq(remainingBalance, 10 * 10 ** 18);
    }
    vm.stopPrank();
  }

  function testThrowWhenInvalidProofFuzz(address _address) public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    vm.startPrank(owner);
    mintingManager.mintDaily();
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, bob);
    vm.stopPrank();
    vm.startPrank(bob);
    wrappedProxyV1.submitMerkleRoot(root, 100 * 10 ** 18);
    RLPReader.RLPItem[] memory rewards = resultData.toRlpItem().toList();
    RLPReader.RLPItem[] memory proofsEncoded = resultProofs.toRlpItem().toList();
    bytes32[] memory _proof = new bytes32[](proofsEncoded[0].toList().length);
    for (uint j = 0; j < proofsEncoded[0].toList().length; ++j) {
      emit log_bytes(proofsEncoded[0].toList()[j].toBytes());
      _proof[j] = bytes32(proofsEncoded[0].toList()[j].toBytes());
    }
    uint256 remainingBalance = wrappedProxyV1.getRemainingAllocatedRewards(
      bytesToAddress(rewards[leaves[0]].toList()[0].toBytes()),
      10000000000000000000,
      1,
      _proof
    );
    vm.stopPrank();
    vm.startPrank(_address);
    vm.expectRevert();
    wrappedProxyV1.claim(remainingBalance, 10000000000000000000, 1, _proof);
    vm.stopPrank();
  }

  function testClaimFuzz(uint256 amount) public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    vm.startPrank(owner);
    mintingManager.mintDaily();
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, bob);
    vm.stopPrank();
    vm.startPrank(bob);
    wrappedProxyV1.submitMerkleRoot(root, 100 * 10 ** 18);
    RLPReader.RLPItem[] memory rewards = resultData.toRlpItem().toList();
    RLPReader.RLPItem[] memory proofsEncoded = resultProofs.toRlpItem().toList();
    bytes32[] memory _proof = new bytes32[](proofsEncoded[0].toList().length);
    for (uint j = 0; j < proofsEncoded[0].toList().length; ++j) {
      emit log_bytes(proofsEncoded[0].toList()[j].toBytes());
      _proof[j] = bytes32(proofsEncoded[0].toList()[j].toBytes());
    }
    uint256 remainingBalance = wrappedProxyV1.getRemainingAllocatedRewards(
      bytesToAddress(rewards[leaves[0]].toList()[0].toBytes()),
      10000000000000000000,
      1,
      _proof
    );
    vm.stopPrank();
    vm.startPrank(address(bytesToAddress(rewards[leaves[0]].toList()[0].toBytes())));
    if (amount > remainingBalance || amount == 0) {
      vm.expectRevert();
      wrappedProxyV1.claim(amount, uint256(rewards[leaves[0]].toList()[1].toUintStrict()), 1, _proof);
    } else {
      wrappedProxyV1.claim(amount, 10000000000000000000, 1, _proof);
    }
    vm.stopPrank();
  }

  function testTransferCompanyTokens() public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    vm.startPrank(owner);
    wrappedProxyV1.setCompanyTarget(bob);
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, alice);
    vm.stopPrank();
    vm.startPrank(alice);
    uint256 ts = 1641070800;
    for (uint i = 0; i < 1098;++i) {
      mintingManager.mintDaily();
      vm.roll(100 + i * 10);
      vm.warp(ts + 86400);
    }
    wrappedProxyV1.transferCompanyTokens();
    uint256 companyTokens = weatherXM.balanceOf(bob);
    assertEq(companyTokens, 30000000 * 10 ** 18);
    vm.stopPrank();
  }

  function testTransferRewards() public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    vm.startPrank(owner);
    mintingManager.mintDaily();
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, bob);
    vm.stopPrank();
    vm.startPrank(bob);
    wrappedProxyV1.submitMerkleRoot(root, 100 * 10 ** 18);
    RLPReader.RLPItem[] memory rewards = resultData.toRlpItem().toList();
    RLPReader.RLPItem[] memory proofsEncoded = resultProofs.toRlpItem().toList();
    bytes32[] memory _proof = new bytes32[](proofsEncoded[0].toList().length);
    for (uint j = 0; j < proofsEncoded[0].toList().length; ++j) {
      emit log_bytes(proofsEncoded[0].toList()[j].toBytes());
      _proof[j] = bytes32(proofsEncoded[0].toList()[j].toBytes());
    }
    wrappedProxyV1.transferRewards(
      bytesToAddress(rewards[leaves[0]].toList()[0].toBytes()),
      1000000000000000000,
      10000000000000000000,
      1,
      _proof
    );
    uint256 balance = weatherXM.balanceOf(bytesToAddress(rewards[leaves[0]].toList()[0].toBytes()));
    assertEq(1000000000000000000, balance);
    vm.stopPrank();    
  }

  function testTransferRewardsFuzz(uint256 amount) public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    vm.startPrank(owner);
    mintingManager.mintDaily();
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, bob);
    vm.stopPrank();
    vm.startPrank(bob);
    wrappedProxyV1.submitMerkleRoot(root, 100 * 10 ** 18);
    RLPReader.RLPItem[] memory rewards = resultData.toRlpItem().toList();
    RLPReader.RLPItem[] memory proofsEncoded = resultProofs.toRlpItem().toList();
    bytes32[] memory _proof = new bytes32[](proofsEncoded[0].toList().length);
    for (uint j = 0; j < proofsEncoded[0].toList().length; ++j) {
      emit log_bytes(proofsEncoded[0].toList()[j].toBytes());
      _proof[j] = bytes32(proofsEncoded[0].toList()[j].toBytes());
    }
    if (amount > 10000000000000000000 || amount == 0) {
      vm.expectRevert();
      wrappedProxyV1.transferRewards(
        bytesToAddress(rewards[leaves[0]].toList()[0].toBytes()),
        amount,
        10000000000000000000,
        1,
        _proof
      );
    } else {
      wrappedProxyV1.transferRewards(
        bytesToAddress(rewards[leaves[0]].toList()[0].toBytes()),
        amount,
        10000000000000000000,
        1,
        _proof
      );
      uint256 balance = weatherXM.balanceOf(bytesToAddress(rewards[leaves[0]].toList()[0].toBytes()));
      assertEq(amount, balance);
    }
    vm.stopPrank();    
  }

  function testTransferBusinessTokens() public {
    mintingManager.setMintTarget(address(wrappedProxyV1));
    mintingManager.mintDaily();
    vm.startPrank(owner);
    wrappedProxyV1.setBusinessDevTarget(bob);
    wrappedProxyV1.grantRole(DISTRIBUTOR_ROLE, alice);
    vm.stopPrank();
    vm.startPrank(alice);
    wrappedProxyV1.submitMerkleRoot(root, 100 * 10 ** 18);
    wrappedProxyV1.transferBusinessDevTokens();
    uint256 businessDevTokens = weatherXM.balanceOf(bob);
    assertEq(businessDevTokens, 14146000000000000000000);
    vm.stopPrank();
  }

  function testCompatabilityOpenZeppelinProver(bytes32[] memory _data, uint256 node) public {
    vm.assume(_data.length > 1);
    vm.assume(node < _data.length);
    root = m.getRoot(_data);
    bytes32[] memory proof = m.getProof(_data, node);
    bytes32 valueToProve = _data[node];
    bool murkyVerified = m.verifyProof(root, proof, valueToProve);
    bool ozVerified = MerkleProof.verify(proof, root, valueToProve);
    assertTrue(murkyVerified == ozVerified);
  }

  function _getData() internal view returns (bytes32[] memory) {
    bytes32[] memory _data = new bytes32[](data.length);
    uint length = data.length;
    for (uint i = 0; i < length; ++i) {
      _data[i] = data[i];
    }
    return _data;
  }

  function bytesToAddress(bytes memory b) internal pure returns (address addr) {
    assembly {
      addr := mload(add(b, 20))
    }
  }
}
