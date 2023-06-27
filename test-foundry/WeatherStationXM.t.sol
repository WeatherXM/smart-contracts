// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {WeatherStationXM} from "src/WeatherStationXM.sol";
import {IWeatherStationXM} from "src/interfaces/IWeatherStationXM.sol";

contract WeatherStationXMTest is Test {
    address public tokenImplementation;
    IWeatherStationXM public weatherStationXM;
    address internal alice;
    address internal bob;
    address internal jack;
    address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
    string internal metadataURI = "bafybeie5abcsk47uiuntk6xmgcy5ibtuv5o66xb6qop7aqw7lz3hz7xapu";
    string internal metadataURIsecond = "bafybeie5abcsk47uiuntk6xmg888283nv5o66xb6qop7aqw7lz3hzt266z";

    function setUp() public {
        vm.startPrank(admin);
        tokenImplementation = address(new WeatherStationXM("WeatherStationXM", "WSXM"));
        weatherStationXM = IWeatherStationXM(tokenImplementation);
        weatherStationXM.grantRole(0x7670093c8396cecff5862296425346d7a6801611a244bd9f8f5b7132e94d46df, address(0x2));
        weatherStationXM.grantRole(0xeefb95e842a3287179d933b4460be539a1d5af11aa8b325bb45c5c8dc92de4ed, address(0x1));
        alice = address(0x1);
        vm.label(alice, "Alice");
        bob = address(0x2);
        vm.label(bob, "Bob");
        jack = address(0x3);
        vm.label(jack, "Jack");
        vm.stopPrank();
    }

    function testMintWeatherStation() public {
        vm.startPrank(bob);
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        assertEq(weatherStationXM.balanceOf(alice), 1);
        assertEq(weatherStationXM.totalSupply(), 1);
        vm.stopPrank();
    }

    function testMintWeatherStationWhenPaused() public {
        vm.startPrank(admin);
        weatherStationXM.pause();
        vm.stopPrank();
        vm.startPrank(bob);
        vm.expectRevert(bytes("Pausable: paused"));
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        vm.stopPrank();
    }

    function testProvisionerRoleShouldOnlyMintsWeatherStation() public {
        vm.startPrank(alice);
        //solhint-disable-next-line max-line-length
        vm.expectRevert(
            bytes(
                //solhint-disable-next-line max-line-length
                "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x7670093c8396cecff5862296425346d7a6801611a244bd9f8f5b7132e94d46df"
            )
        );
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        vm.stopPrank();
    }

    function testMintConsequentlyWeatherStation() public {
        vm.startPrank(bob);
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        weatherStationXM.mintWeatherStation(alice, metadataURIsecond);
        assertEq(weatherStationXM.balanceOf(alice), 2);
        assertEq(weatherStationXM.totalSupply(), 2);
        vm.stopPrank();
    }

    function testBurnWeatherStation() public {
        vm.startPrank(bob);
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        assertEq(weatherStationXM.balanceOf(alice), 1);
        assertEq(weatherStationXM.totalSupply(), 1);
        vm.stopPrank();
        vm.startPrank(alice);
        weatherStationXM.burn(1);
        vm.stopPrank();
    }

    function testBurnWeatherStationWhenPaused() public {
        vm.startPrank(bob);
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        assertEq(weatherStationXM.balanceOf(alice), 1);
        assertEq(weatherStationXM.totalSupply(), 1);
        vm.stopPrank();
        vm.startPrank(admin);
        weatherStationXM.pause();
        vm.stopPrank();
        vm.startPrank(alice);
        vm.expectRevert(bytes("Pausable: paused"));
        weatherStationXM.burn(1);
        vm.stopPrank();
    }

    function testPauseUnpauseWhenMnting() public {
        vm.startPrank(admin);
        weatherStationXM.pause();
        vm.stopPrank();
        vm.startPrank(bob);
        vm.expectRevert(bytes("Pausable: paused"));
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        vm.stopPrank();
        vm.startPrank(admin);
        weatherStationXM.unpause();
        vm.stopPrank();
        vm.startPrank(bob);
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        assertEq(weatherStationXM.balanceOf(alice), 1);
        assertEq(weatherStationXM.totalSupply(), 1);
        vm.stopPrank();
    }

    function testTransferWeatherStation() public {
        vm.startPrank(bob);
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        assertEq(weatherStationXM.balanceOf(alice), 1);
        assertEq(weatherStationXM.totalSupply(), 1);
        vm.stopPrank();
        vm.startPrank(alice);
        weatherStationXM.transferFrom(alice, bob, 1);
        vm.stopPrank();
    }

    function testRevertTransferWeatherStation() public {
        vm.startPrank(bob);
        weatherStationXM.mintWeatherStation(alice, metadataURI);
        assertEq(weatherStationXM.balanceOf(alice), 1);
        assertEq(weatherStationXM.totalSupply(), 1);
        vm.expectRevert("ERC721: caller is not token owner or approved");
        weatherStationXM.transferFrom(bob, jack, 1);
        vm.stopPrank();
    }
}
