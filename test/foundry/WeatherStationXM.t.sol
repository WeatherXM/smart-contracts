// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Test } from "forge-std/Test.sol";
import { WeatherStationXM } from "src/WeatherStationXM.sol";
import { IWeatherStationXM } from "src/interfaces/IWeatherStationXM.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";

contract WeatherStationXMTest is Test {
  WeatherStationXM internal weatherStationXM;
  address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
  address internal alice;
  address internal bob;
  address internal manufacturer;
  address internal stationPubkey1;
  address internal stationPubkey2;
  address internal stationPubkey3;
  bytes internal exampleMetadata1 = abi.encodePacked(
    "{",
      "\"name\": \"WeatherXM Station #", uint256(0), "\"",
      "\"image\": \"ipfs://image1\"",
      "\"stationMetadata\": \"ipfs://stationMetadata1\"",
      "\"attributes\": [",
        "{",
          "\"trait_type\": \"serialNum\"",
          "\"value\": \"serialNum1\"",
        "}",
        "{",
          "\"trait_type\": \"model\"",
          "\"value\": \"model1\"",
        "}",
        "{",
          "\"trait_type\": \"pubKey\"",
          "\"value\": \"", address(0x4), "\"",
        "}",
        "{",
          "\"trait_type\": \"decomissioned\"",
          "\"value\": \"", false, "\"",
        "}",
      "]",
    "}"
  );
  bytes internal exampleMetadata2 = abi.encodePacked(
    "{",
      "\"name\": \"WeatherXM Station #", uint256(1), "\"",
      "\"image\": \"ipfs://image2\"",
      "\"stationMetadata\": \"ipfs://stationMetadata2\"",
      "\"attributes\": [",
        "{",
          "\"trait_type\": \"serialNum\"",
          "\"value\": \"serialNum2\"",
        "}",
        "{",
          "\"trait_type\": \"model\"",
          "\"value\": \"model2\"",
        "}",
        "{",
          "\"trait_type\": \"pubKey\"",
          "\"value\": \"", address(0x5), "\"",
        "}",
        "{",
          "\"trait_type\": \"decomissioned\"",
          "\"value\": \"", false, "\"",
        "}",
      "]",
    "}"
  );

  function setUp() public {
    vm.startPrank(admin);
    vm.deal(admin, 1 ether);
    weatherStationXM = new WeatherStationXM("WeatherXM Station", "WXM_STATION");
    alice = address(0x1);
    vm.label(alice, "Alice");
    bob = address(0x2);
    vm.label(bob, "Bob");
    manufacturer = address(0x3);
    vm.label(manufacturer, "Manufacturer");
    stationPubkey1 = address(0x4);
    vm.label(stationPubkey1, "stationPubkey1");
    stationPubkey2 = address(0x5);
    vm.label(stationPubkey2, "stationPubkey2");
    stationPubkey3 = address(0x6);
    vm.label(stationPubkey3, "stationPubkey3");
    vm.stopPrank();
  }

  function testContrsuctor() public {
    vm.startPrank(admin);

    weatherStationXM = new WeatherStationXM("WeatherXM Station", "WXM_STATION");
    
    assertEq(weatherStationXM.name(), "WeatherXM Station");
    assertEq(weatherStationXM.symbol(), "WXM_STATION");

    assertTrue(weatherStationXM.hasRole(weatherStationXM.DEFAULT_ADMIN_ROLE(), admin));
    assertTrue(weatherStationXM.hasRole(weatherStationXM.PROVISIONER_ROLE(), admin));
    assertTrue(weatherStationXM.hasRole(weatherStationXM.MANUFACTURER_ROLE(), admin));

    vm.stopPrank();
  }

  function testMintWeatherStation() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    assertEq(weatherStationXM.totalSupply(), 1);
    assertEq(weatherStationXM.ownerOf(0), manufacturer);
    
    (
      string memory serialNum,
      string memory model,
      address pubKey,
      bool decomissioned,
      string memory image,
      string memory stationMetadata
    ) = weatherStationXM.tokenMetadata(0);

    assertEq(serialNum, "serialNum1");
    assertEq(model, "model1");
    assertEq(pubKey, stationPubkey1);
    assertFalse(decomissioned);
    assertEq(image, "ipfs://image-uri");
    assertEq(stationMetadata, "ipfs://station-metadata");

    vm.stopPrank();
  }

  function testMintWeatherStationWrongCaller() public {
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x7670093c8396cecff5862296425346d7a6801611a244bd9f8f5b7132e94d46df"
    );
    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testMintWeatherStationExistingPubKeyWithOneToken() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherStationXM.PubKeyAlreadyExists.selector);
    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testMintWeatherStationExistingPubKeyWithMoreThanOneTokens() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherStationXM.PubKeyAlreadyExists.selector);
    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum3",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherStationXM.PubKeyAlreadyExists.selector);
    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum3",
      "model1",
      stationPubkey2,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testMintWeatherStationExistingSerialNumWithOneToken() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherStationXM.SerialNumAlreadyExists.selector);
    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey2,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testMintWeatherStationExistingSerialNumWithMoreThanOneTokens() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherStationXM.SerialNumAlreadyExists.selector);
    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model1",
      stationPubkey3,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherStationXM.SerialNumAlreadyExists.selector);
    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey3,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testTokenURI() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    string memory tokenURI0 = weatherStationXM.tokenURI(0);
    string memory tokenURI1 = weatherStationXM.tokenURI(1);

    assertEq(
      tokenURI0,
      string(abi.encodePacked("data:application/json;base64,", Base64.encode(exampleMetadata1)))
    );
    assertEq(
      tokenURI1,
      string(abi.encodePacked("data:application/json;base64,", Base64.encode(exampleMetadata2)))
    );

    vm.stopPrank();
  }

  function testTokenURINonExistentToken() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    vm.expectRevert(IWeatherStationXM.TokenDoesNotExist.selector);
    weatherStationXM.tokenURI(2);

    vm.stopPrank();
  }

  function testApproveBlocked() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );
    
    vm.stopPrank();

    vm.startPrank(manufacturer);

    vm.expectRevert("ERC721 public approve not allowed");
    weatherStationXM.approve(alice, 0);

    vm.stopPrank();
  }

  function testSetApprovalForAllBlocked() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );
    
    vm.stopPrank();

    vm.startPrank(manufacturer);

    vm.expectRevert("ERC721 public setApprovalForAll not allowed");
    weatherStationXM.setApprovalForAll(alice, true);

    vm.stopPrank();
  }

  function testTransferFromBlocked() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );
    
    vm.stopPrank();

    vm.startPrank(manufacturer);

    vm.expectRevert("ERC721 public transferFrom not allowed");
    weatherStationXM.transferFrom(manufacturer, alice, 0);

    vm.stopPrank();
  }

  function testSafeTransferFromBlocked() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );
    
    vm.stopPrank();

    vm.startPrank(manufacturer);

    vm.expectRevert("ERC721 public safeTransferFrom not allowed");
    weatherStationXM.safeTransferFrom(manufacturer, alice, 0);

    vm.stopPrank();
  }

  function testSafeTransferFromWithDataBlocked() public {
    vm.startPrank(admin);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );
    
    vm.stopPrank();

    vm.startPrank(manufacturer);

    vm.expectRevert("ERC721 public safeTransferFrom not allowed");
    weatherStationXM.safeTransferFrom(manufacturer, alice, 0, bytes("0x0"));

    vm.stopPrank();
  }

  function testCorrectlyTrackTotalSupply() public {
    vm.startPrank(admin);

    assertEq(weatherStationXM.totalSupply(), 0);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    assertEq(weatherStationXM.totalSupply(), 1);

    weatherStationXM.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    assertEq(weatherStationXM.totalSupply(), 2);

    vm.stopPrank();
  }
}