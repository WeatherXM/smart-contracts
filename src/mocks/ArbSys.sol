// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract ArbSys {
  function arbBlockNumber() public view returns (uint256) {
    return block.number;
  }

  function arbBlockHash(uint256 blockNumber) public view returns (bytes32) {
    return blockhash(blockNumber);
  }
}
