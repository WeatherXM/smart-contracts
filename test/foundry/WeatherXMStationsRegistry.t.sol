// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Test } from "forge-std/Test.sol";
import { WeatherXMStationsRegistry } from "src/WeatherXMStationsRegistry.sol";
import { IWeatherXMStationsRegistry } from "src/interfaces/IWeatherXMStationsRegistry.sol";
import { ERC1967Proxy } from "lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import { Strings } from "lib/openzeppelin-contracts/contracts/utils/Strings.sol";

contract WeatherXMStationsRegistryTest is Test {
  WeatherXMStationsRegistry internal stationRegistryImplementaion;
  WeatherXMStationsRegistry internal stationRegistry;
  ERC1967Proxy public proxy;
  address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
  address internal alice;
  address internal bob;

  function setUp() external {
    vm.startPrank(admin);
    stationRegistryImplementaion = new WeatherXMStationsRegistry();
    proxy = new ERC1967Proxy(address(stationRegistryImplementaion), "");
    stationRegistry = WeatherXMStationsRegistry(address(proxy));
    stationRegistry.initialize();

    alice = address(0x1);
    vm.label(alice, "Alice");
    bob = address(0x2);
    vm.label(bob, "Bob");
    vm.stopPrank();
  }

  function testContructor() public {
    assertTrue(stationRegistry.hasRole(stationRegistry.DEFAULT_ADMIN_ROLE(), admin));
    assertTrue(stationRegistry.hasRole(stationRegistry.UPGRADER_ROLE(), admin));
    assertTrue(stationRegistry.hasRole(stationRegistry.STATIONS_MANAGER_ROLE(), admin));
    assertEq(stationRegistry.getStationsLength(), 0);
  }

  function testAddStation() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");

    (uint256 index1, string memory metadataURI1, bool decommissioned1) = stationRegistry.stations("model1");

    assertEq(index1, 0);
    assertEq(metadataURI1, "ipfs://.....1");
    assertFalse(decommissioned1);

    stationRegistry.addStation("model2", "ipfs://.....2");

    (uint256 index2, string memory metadataURI2, bool decommissioned2) = stationRegistry.stations("model2");

    assertEq(index2, 1);
    assertEq(metadataURI2, "ipfs://.....2");
    assertFalse(decommissioned2);

    vm.stopPrank();
  }

  function testAddStationDuplicate() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");

    (uint256 index1, string memory metadataURI1, bool decommissioned1) = stationRegistry.stations("model1");

    assertEq(index1, 0);
    assertEq(metadataURI1, "ipfs://.....1");
    assertFalse(decommissioned1);

    vm.expectRevert(IWeatherXMStationsRegistry.StationAlreadyExists.selector);
    stationRegistry.addStation("model1", "ipfs://.....2");

    vm.stopPrank();
  }

  function testAddStationWrongCaller() public {
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xbc24be2b44e672912081495f0782e0e138e386e73fac1927ac011a5005ce6e5f"
    );
    stationRegistry.addStation("model1", "ipfs://.....1");

    vm.stopPrank();
  }

  function testSetDecommissioned() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");

    (uint256 index1, string memory metadataURI1, bool decommissioned1) = stationRegistry.stations("model1");

    assertEq(index1, 0);
    assertEq(metadataURI1, "ipfs://.....1");
    assertFalse(decommissioned1);

    stationRegistry.addStation("model2", "ipfs://.....2");

    (uint256 index2, string memory metadataURI2, bool decommissioned2) = stationRegistry.stations("model2");

    assertEq(index2, 1);
    assertEq(metadataURI2, "ipfs://.....2");
    assertFalse(decommissioned2);

    stationRegistry.setDecommissioned("model1", true);
    (uint256 index1After, string memory metadataURI1After, bool decommissioned1After) = stationRegistry.stations("model1");

    assertEq(index1After, 0);
    assertEq(metadataURI1After, "ipfs://.....1");
    assertTrue(decommissioned1After);

    (uint256 index2After, string memory metadataURI2Adter, bool decommissioned2After) = stationRegistry.stations("model2");

    assertEq(index2After, 1);
    assertEq(metadataURI2Adter, "ipfs://.....2");
    assertFalse(decommissioned2After);

    vm.stopPrank();
  }

  function testSetDecommissionedNonExistent() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");

    (uint256 index1, string memory metadataURI1, bool decommissioned1) = stationRegistry.stations("model1");

    assertEq(index1, 0);
    assertEq(metadataURI1, "ipfs://.....1");
    assertFalse(decommissioned1);

    stationRegistry.addStation("model2", "ipfs://.....2");

    (uint256 index2, string memory metadataURI2, bool decommissioned2) = stationRegistry.stations("model2");

    assertEq(index2, 1);
    assertEq(metadataURI2, "ipfs://.....2");
    assertFalse(decommissioned2);
    
    vm.expectRevert(IWeatherXMStationsRegistry.InvalidStation.selector);
    stationRegistry.setDecommissioned("model3", true);
    (uint256 index1After, string memory metadataURI1After, bool decommissioned1After) = stationRegistry.stations("model1");

    assertEq(index1After, 0);
    assertEq(metadataURI1After, "ipfs://.....1");
    assertFalse(decommissioned1After);

    (uint256 index2After, string memory metadataURI2Adter, bool decommissioned2After) = stationRegistry.stations("model2");

    assertEq(index2After, 1);
    assertEq(metadataURI2Adter, "ipfs://.....2");
    assertFalse(decommissioned2After);

    vm.stopPrank();
  }

  function testSetDecommissionedWrongCaller() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");
    stationRegistry.addStation("model2", "ipfs://.....2");

    vm.stopPrank();
    vm.startPrank(alice);
    
    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xbc24be2b44e672912081495f0782e0e138e386e73fac1927ac011a5005ce6e5f"
    );
    stationRegistry.setDecommissioned("model1", true);

    vm.stopPrank();
  }

  function testSetURI() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");

    (uint256 index1, string memory metadataURI1, bool decommissioned1) = stationRegistry.stations("model1");

    assertEq(index1, 0);
    assertEq(metadataURI1, "ipfs://.....1");
    assertFalse(decommissioned1);

    stationRegistry.addStation("model2", "ipfs://.....2");

    (uint256 index2, string memory metadataURI2, bool decommissioned2) = stationRegistry.stations("model2");

    assertEq(index2, 1);
    assertEq(metadataURI2, "ipfs://.....2");
    assertFalse(decommissioned2);

    stationRegistry.setURI("model1", "ipfs://.....1-update");
    (uint256 index1After, string memory metadataURI1After, bool decommissioned1After) = stationRegistry.stations("model1");

    assertEq(index1After, 0);
    assertEq(metadataURI1After, "ipfs://.....1-update");
    assertFalse(decommissioned1After);

    (uint256 index2After, string memory metadataURI2Adter, bool decommissioned2After) = stationRegistry.stations("model2");

    assertEq(index2After, 1);
    assertEq(metadataURI2Adter, "ipfs://.....2");
    assertFalse(decommissioned2After);

    vm.stopPrank();
  }

  function testSetURINonExistent() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");

    (uint256 index1, string memory metadataURI1, bool decommissioned1) = stationRegistry.stations("model1");

    assertEq(index1, 0);
    assertEq(metadataURI1, "ipfs://.....1");
    assertFalse(decommissioned1);

    stationRegistry.addStation("model2", "ipfs://.....2");

    (uint256 index2, string memory metadataURI2, bool decommissioned2) = stationRegistry.stations("model2");

    assertEq(index2, 1);
    assertEq(metadataURI2, "ipfs://.....2");
    assertFalse(decommissioned2);

    vm.expectRevert(IWeatherXMStationsRegistry.InvalidStation.selector);
    stationRegistry.setURI("model3", "ipfs://.....1-update");
    (uint256 index1After, string memory metadataURI1After, bool decommissioned1After) = stationRegistry.stations("model1");

    assertEq(index1After, 0);
    assertEq(metadataURI1After, "ipfs://.....1");
    assertFalse(decommissioned1After);

    (uint256 index2After, string memory metadataURI2Adter, bool decommissioned2After) = stationRegistry.stations("model2");

    assertEq(index2After, 1);
    assertEq(metadataURI2Adter, "ipfs://.....2");
    assertFalse(decommissioned2After);

    vm.stopPrank();
  }

  function testSetURIWrongCaller() public {
    vm.startPrank(admin);

    stationRegistry.addStation("model1", "ipfs://.....1");
    stationRegistry.addStation("model2", "ipfs://.....2");

    vm.stopPrank();
    vm.startPrank(alice);
    
    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xbc24be2b44e672912081495f0782e0e138e386e73fac1927ac011a5005ce6e5f"
    );
    stationRegistry.setURI("model1", "ipfs://.....1-update");

    vm.stopPrank();
  }

  function testGetStationsLength() public {
    vm.startPrank(admin);

    for(uint256 i = 0 ; i < 100 ; i++) {
      stationRegistry.addStation(
        string.concat("model", Strings.toString(i)),
        string.concat("ipfs://", Strings.toString(i))
      );
    }

    vm.stopPrank();
  }
}