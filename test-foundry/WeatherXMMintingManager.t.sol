// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Test } from "forge-std/Test.sol";
import { WeatherXM } from "src/WeatherXM.sol";
import { IWeatherXM } from "src/interfaces/IWeatherXM.sol";
import { WeatherXMMintingManager } from "src/WeatherXMMintingManager.sol";
import { IWeatherXMMintingManager } from "src/interfaces/IWeatherXMMintingManager.sol";
import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract WeatherXMMintingManagerTest is Test {
    address internal tokenImplementation;
    IWeatherXM public weatherXM;
    ERC1967Proxy public mintingManagerProxy;
    WeatherXMMintingManager public mintingManager;
    address internal alice;
    address internal bob;
    address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
    uint256 internal maxTransferAmount = 1e7 * 10 ** 18;
    uint256 public initialAmount = 18000000;

    function setUp() public {
        vm.startPrank(admin);
        mintingManager = new WeatherXMMintingManager();
        tokenImplementation = address(new WeatherXM("WeatherXM", "WXM", address(mintingManager)));
        mintingManager.setToken(tokenImplementation);
        weatherXM = IWeatherXM(tokenImplementation);

        alice = address(0x1);
        vm.label(alice, "Alice");
        bob = address(0x2);
        vm.label(bob, "Bob");
        vm.stopPrank();
    }

    function transferToken(address from, address to, uint256 transferAmount) internal returns (bool) {
        vm.prank(from);
        return weatherXM.transfer(to, transferAmount);
    }

    function testSupplyByTheEndFirstYear() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        mintingManager.setMintTarget(bob);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        uint256 ts = 1641070800;
        uint256 mintedRewardTokens;
        uint256 mintedCompanyTokens;
        for (uint256 i = 1; i <= 365; ) {
            mintingManager.mintDaily();
            unchecked {
                i++;
            }
            //mine new blocks day after day in order to surpass the 24h rate limit
            vm.roll(100 + i * 10);
            vm.warp(ts + 86400);
        }
        (mintedRewardTokens, mintedCompanyTokens) = mintingManager.getMintedTokens();
        assertEq(mintedRewardTokens, 5199790 * 10 ** 18);
        assertEq(mintedCompanyTokens, 2993000 * 10 ** 18);
        assertEq(
            weatherXM.totalSupply(),
            initialAmount * 10 ** uint256(weatherXM.decimals()) + 5199790 * 10 ** 18 + 2993000 * 10 ** 18
        );
        vm.stopPrank();
    }

    function testSupplyByTheEndSecondYear() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        mintingManager.setMintTarget(bob);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        uint256 ts = 1641070800;
        uint256 mintedRewardTokens;
        uint256 mintedCompanyTokens;
        //2 years and 2 days are required to reach the 20% of the company and investors tokens
        for (uint256 i = 1; i <= 732; ) {
            mintingManager.mintDaily();
            unchecked {
                i++;
            }
            //mine new blocks day after day in order to surpass the 24h rate limit
            vm.roll(100 + i * 10);
            vm.warp(ts + 86400);
        }
        (mintedRewardTokens, mintedCompanyTokens) = mintingManager.getMintedTokens();
        assertEq(mintedRewardTokens, 10428072 * 10 ** 18);
        assertEq(mintedCompanyTokens, 6000000 * 10 ** 18);
        assertEq(
            weatherXM.totalSupply(),
            initialAmount * 10 ** uint256(weatherXM.decimals()) + 10428072 * 10 ** 18 + 6000000 * 10 ** 18
        );
        vm.stopPrank();
    }

    function testSupplyByTheEndThirdYear() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        mintingManager.setMintTarget(bob);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        uint256 ts = 1641070800;
        uint256 mintedRewardTokens;
        uint256 mintedCompanyTokens;
        //3 years and 3 days are required to reach the 100% of the company and investors tokens
        for (uint256 i = 1; i <= 1098; ) {
            mintingManager.mintDaily();
            unchecked {
                i++;
            }
            //mine new blocks day after day in order to surpass the 24h rate limit
            vm.roll(100 + i * 10);
            vm.warp(ts + 86400);
        }
        (mintedRewardTokens, mintedCompanyTokens) = mintingManager.getMintedTokens();
        assertEq(mintedRewardTokens, 15642108 * 10 ** 18);
        assertEq(mintedCompanyTokens, 30000000 * 10 ** 18);
        assertEq(
            weatherXM.totalSupply(),
            initialAmount * 10 ** uint256(weatherXM.decimals()) + 15642108 * 10 ** 18 + 30000000 * 10 ** 18
        );
        vm.stopPrank();
    }

    function testSupplyByTheEndFourthYear() public {
        uint256 yearlyEmission = 365 * (14246 * 10 ** 18);
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        mintingManager.setMintTarget(bob);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        uint256 ts = 1641070800;
        uint256 mintedRewardTokens;
        uint256 mintedCompanyTokens;
        for (uint256 i = 1; i <= 1463; ) {
            mintingManager.mintDaily();
            unchecked {
                i++;
            }
            //mine new blocks day after day in order to surpass the 24h rate limit
            vm.roll(100 + i * 10);
            vm.warp(ts + 86400);
        }
        (mintedRewardTokens, mintedCompanyTokens) = mintingManager.getMintedTokens();
        assertEq(mintedRewardTokens, 15642108 * 10 ** 18 + yearlyEmission);
        assertEq(mintedCompanyTokens, 30000000 * 10 ** 18);
        assertEq(
            weatherXM.totalSupply(),
            initialAmount * 10 ** uint256(weatherXM.decimals()) + 15642108 * 10 ** 18 + yearlyEmission + 30000000 * 10 ** 18
        );
        vm.stopPrank();
    }

    function testSupplyByTheEndTenthYear() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        mintingManager.setMintTarget(bob);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        uint256 ts = 1641070800;
        uint256 mintedRewardTokens;
        uint256 mintedCompanyTokens;
        //10 years and 1 day are required for rewards emissions to be 52M
        for (uint256 i = 1; i <= 3651; ) {
            mintingManager.mintDaily();
            unchecked {
                i++;
            }
            //mine new blocks day after day in order to surpass the 24h rate limit
            vm.roll(100 + i * 10);
            vm.warp(ts + 86400);
        }
        (mintedRewardTokens, mintedCompanyTokens) = mintingManager.getMintedTokens();
        assertEq(mintedRewardTokens, 52000000 * 10 ** 18);
        assertEq(mintedCompanyTokens, 30000000 * 10 ** 18);
        assertEq(weatherXM.totalSupply(), 1e8 * 10 ** 18);
        vm.stopPrank();
    }

    function testMintRateLimiting() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        mintingManager.setMintTarget(bob);
        mintingManager.mintDaily();
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        assertEq(
            weatherXM.totalSupply(),
            initialAmount * 10 ** uint256(weatherXM.decimals()) + 8200 * 10 ** 18 + 14246 * 10 ** 18
        );
        assertEq(weatherXM.balanceOf(bob), 8200 * 10 ** 18 + 14246 * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(admin);
        vm.expectRevert();
        mintingManager.mintDaily();
        vm.stopPrank();
    }

    function testMintingRewardsAfterBurn() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        mintingManager.setMintTarget(bob);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        uint256 ts = 1641070800;
        uint256 mintedRewardTokens;
        uint256 mintedCompanyTokens;
        //10 years and 1 day are required for rewards emissions to be 52M
        for (uint256 i = 1; i <= 3651; ) {
            mintingManager.mintDaily();
            unchecked {
                i++;
            }
            //mine new blocks day after day in order to surpass the 24h rate limit
            vm.roll(100 + i * 10);
            vm.warp(ts + 86400);
        }
        (mintedRewardTokens, mintedCompanyTokens) = mintingManager.getMintedTokens();
        assertEq(mintedRewardTokens, 52000000 * 10 ** 18);
        assertEq(mintedCompanyTokens, 30000000 * 10 ** 18);
        assertEq(weatherXM.totalSupply(), 1e8 * 10 ** 18);
        vm.stopPrank();

        vm.startPrank(bob);
        // Burn 10M tokens from bob
        weatherXM.burn(10e6 * 10 ** 18);

        assertEq(weatherXM.totalSupply(), 9e7 * 10 ** 18);

        mintingManager.mintDaily();

        // Another 14246 * 10 ** 18 WXM has been minted which is the rewards daily amount
        assertEq(weatherXM.totalSupply(), 9e7 * 10 ** 18 + 14246 * 10 ** 18);

        vm.stopPrank();
    }
}
