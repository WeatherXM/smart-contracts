// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Test } from "forge-std/Test.sol";
import { WeatherXMStation } from "src/WeatherXMStation.sol";
import { WeatherXMStationsRegistry } from "src/WeatherXMStationsRegistry.sol";
import { IWeatherXMStation } from "src/interfaces/IWeatherXMStation.sol";
import { IWeatherXMStationsRegistry } from "src/interfaces/IWeatherXMStationsRegistry.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { ERC1967Proxy } from "lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";
//solhint-disable-next-line no-console
import { console } from "forge-std/console.sol";

contract WeatherXMStationTest is Test {
  WeatherXMStation internal weatherXMStation;
  WeatherXMStationsRegistry internal stationRegistryImplementaion;
  WeatherXMStationsRegistry internal stationRegistry;
  ERC1967Proxy public proxy;
  address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
  address internal alice;
  address internal bob;
  address internal manufacturer;
  address internal stationPubkey1;
  address internal stationPubkey2;
  address internal stationPubkey3;

  function getAttr1() internal returns(bytes memory) {
    return abi.encodePacked(
      "{",
        "\"trait_type\": \"serialNum\",",
        "\"value\": \"serialNum1\"",
      "},",
      "{",
        "\"trait_type\": \"model\",",
        "\"value\": \"model1\"",
      "},",
      "{",
        "\"trait_type\": \"pubKey\",",
        "\"value\": \"", Strings.toHexString(address(0x4)), "\"",
      "},",
      "{",
        "\"trait_type\": \"decomissioned\",",
        "\"value\": \"false\"",
      "}"
    );
  }

  function getAttr2() internal returns(bytes memory) {
    return abi.encodePacked(
      "{",
        "\"trait_type\": \"serialNum\",",
        "\"value\": \"serialNum2\"",
      "},",
      "{",
        "\"trait_type\": \"model\",",
        "\"value\": \"model2\"",
      "},",
      "{",
        "\"trait_type\": \"pubKey\",",
        "\"value\": \"", Strings.toHexString(address(0x5)), "\"",
      "},",
      "{",
        "\"trait_type\": \"decomissioned\",",
        "\"value\": \"false\"",
      "}"
    );
  }
  
  function getMeta1() internal returns(bytes memory) {
    return abi.encodePacked(
      "{",
        "\"name\": \"WeatherXM Station #0\",",
        "\"image\": \"ipfs://image1\",",
        "\"stationMetadata\": \"ipfs://stationMetadata1\",",
        "\"attributes\": [",
          getAttr1(),
        "]",
      "}"
    );
  }

  function getMeta2() internal returns(bytes memory) {
    return abi.encodePacked(
      "{",
        "\"name\": \"WeatherXM Station #1\",",
        "\"image\": \"ipfs://image2\",",
        "\"stationMetadata\": \"ipfs://stationMetadata2\",",
        "\"attributes\": [",
          getAttr2(),
        "]",
      "}"
    );
  }

  function setUp() public {
    vm.startPrank(admin);
    vm.deal(admin, 1 ether);
    stationRegistryImplementaion = new WeatherXMStationsRegistry();
    proxy = new ERC1967Proxy(address(stationRegistryImplementaion), "");
    stationRegistry = WeatherXMStationsRegistry(address(proxy));
    stationRegistry.initialize();
    weatherXMStation = new WeatherXMStation("WeatherXM Station", "WXM_STATION");
    weatherXMStation.setStationRegistry(IWeatherXMStationsRegistry(stationRegistry));
    stationRegistry.addStation("model1", "meta1");
    stationRegistry.addStation("model2", "meta2");
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

    weatherXMStation = new WeatherXMStation("WeatherXM Station", "WXM_STATION");
    
    assertEq(weatherXMStation.name(), "WeatherXM Station");
    assertEq(weatherXMStation.symbol(), "WXM_STATION");

    assertTrue(weatherXMStation.hasRole(weatherXMStation.DEFAULT_ADMIN_ROLE(), admin));
    assertTrue(weatherXMStation.hasRole(weatherXMStation.PROVISIONER_ROLE(), admin));

    vm.stopPrank();
  }

  function testMintWeatherStation() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    assertEq(weatherXMStation.totalSupply(), 1);
    assertEq(weatherXMStation.ownerOf(0), manufacturer);
    
    (
      string memory serialNum,
      string memory model,
      address pubKey,
      bool decomissioned,
      string memory image,
      string memory stationMetadata
    ) = weatherXMStation.tokenMetadata(0);

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
    weatherXMStation.mintWeatherStation(
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

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherXMStation.PubKeyAlreadyExists.selector);
    weatherXMStation.mintWeatherStation(
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

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherXMStation.PubKeyAlreadyExists.selector);
    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum3",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherXMStation.PubKeyAlreadyExists.selector);
    weatherXMStation.mintWeatherStation(
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

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherXMStation.SerialNumAlreadyExists.selector);
    weatherXMStation.mintWeatherStation(
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

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherXMStation.SerialNumAlreadyExists.selector);
    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model1",
      stationPubkey3,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.expectRevert(IWeatherXMStation.SerialNumAlreadyExists.selector);
    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey3,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testMintWeatherStationInvalidModel() public {
    vm.startPrank(admin);

    vm.expectRevert(IWeatherXMStation.InvalidStationModel.selector);
    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model3",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testMintWeatherStationInvalidDecommissionModel() public {
    vm.startPrank(admin);

    stationRegistry.setDecommissioned("model2", true);

    vm.expectRevert(IWeatherXMStation.StationModelIsDecommissioned.selector);
    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model2",
      stationPubkey1,
      "ipfs://image-uri",
      "ipfs://station-metadata"
    );

    vm.stopPrank();
  }

  function testTokenURI() public {
    bytes memory exampleMetadata1 = getMeta1();

    bytes memory exampleMetadata2 = getMeta2();
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    string memory tokenURI0 = weatherXMStation.tokenURI(0);
    string memory tokenURI1 = weatherXMStation.tokenURI(1);

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

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    vm.expectRevert(IWeatherXMStation.TokenDoesNotExist.selector);
    weatherXMStation.tokenURI(2);

    vm.stopPrank();
  }

  function testApproveBlocked() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
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
    weatherXMStation.approve(alice, 0);

    vm.stopPrank();
  }

  function testSetApprovalForAllBlocked() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
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
    weatherXMStation.setApprovalForAll(alice, true);

    vm.stopPrank();
  }

  function testTransferFromBlocked() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
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
    weatherXMStation.transferFrom(manufacturer, alice, 0);

    vm.stopPrank();
  }

  function testSafeTransferFromBlocked() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
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
    weatherXMStation.safeTransferFrom(manufacturer, alice, 0);

    vm.stopPrank();
  }

  function testSafeTransferFromWithDataBlocked() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
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
    weatherXMStation.safeTransferFrom(manufacturer, alice, 0, bytes("0x0"));

    vm.stopPrank();
  }

  function testCorrectlyTrackTotalSupply() public {
    vm.startPrank(admin);

    assertEq(weatherXMStation.totalSupply(), 0);

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    assertEq(weatherXMStation.totalSupply(), 1);

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    assertEq(weatherXMStation.totalSupply(), 2);

    vm.stopPrank();
  }

  function testDecommissionStation() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    weatherXMStation.decommissionStation(0);

    (
      string memory serialNum,
      string memory model,
      address pubKey,
      bool decomissioned,
      string memory image,
      string memory stationMetadata
    ) = weatherXMStation.tokenMetadata(0);

    (
      string memory serialNum2,
      string memory model2,
      address pubKey2,
      bool decomissioned2,
      string memory image2,
      string memory stationMetadata2
    ) = weatherXMStation.tokenMetadata(1);

    assertTrue(decomissioned);
    assertFalse(decomissioned2);

    vm.stopPrank();
  }

  function testDecommissionStationNonExistent() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    vm.expectRevert(IWeatherXMStation.TokenDoesNotExist.selector);
    weatherXMStation.decommissionStation(2);

    vm.stopPrank();
  }

  function testDecommissionStationWrongCaller() public {
    vm.startPrank(admin);

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum1",
      "model1",
      stationPubkey1,
      "ipfs://image1",
      "ipfs://stationMetadata1"
    );

    weatherXMStation.mintWeatherStation(
      manufacturer,
      "serialNum2",
      "model2",
      stationPubkey2,
      "ipfs://image2",
      "ipfs://stationMetadata2"
    );

    vm.stopPrank();
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
    );
    weatherXMStation.decommissionStation(2);

    vm.stopPrank();
  }
}