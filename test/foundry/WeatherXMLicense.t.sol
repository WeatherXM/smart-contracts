// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Test } from "forge-std/Test.sol";
import { WeatherXMLicense } from "src/WeatherXMLicense.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";

contract WeatherXMLicenseTest is Test {
  WeatherXMLicense internal license;
  address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
  address internal alice;
  address internal bob;
  string internal exampleMetadata1 = "{\"type\": \"wxmLicense1\", \"createdAt\": 1234567}";
  string internal exampleMetadata2 = "{\"type\": \"wxmLicense2\", \"createdAt\": 12345678}";


  function setUp() public {
    vm.startPrank(admin);
    vm.deal(admin, 1 ether);
    license = new WeatherXMLicense("WeatherXM License", "WXM_LICENSE");
    alice = address(0x1);
    vm.label(alice, "Alice");
    bob = address(0x2);
    vm.label(bob, "Bob");
    vm.stopPrank();
  }

  function testMintLicense() public {
    vm.startPrank(admin);

    license.mintLicense(exampleMetadata1, alice);
    license.mintLicense(exampleMetadata2, bob);

    assertEq(license.ownerOf(0), alice);
    assertEq(license.ownerOf(1), bob);
    assertEq(license.totalSupply(), 2);

    string memory expectedUri1 = string(
      abi.encodePacked(
        "data:application/json;base64,",
        Base64.encode(abi.encodePacked(exampleMetadata1))
      )
    );
    string memory expectedUri2 = string(
      abi.encodePacked(
        "data:application/json;base64,",
        Base64.encode(abi.encodePacked(exampleMetadata2))
      )
    );

    assertEq(license.tokenURI(0), expectedUri1);
    assertEq(license.tokenURI(1), expectedUri2);
  } 
}