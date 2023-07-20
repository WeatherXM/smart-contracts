// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Vm } from "forge-std/Vm.sol";
import { DSTest } from "ds-test/test.sol";
import { Test } from "forge-std/Test.sol";
import { WeatherXM } from "src/WeatherXM.sol";
import { RewardsVault } from "src/RewardsVault.sol";
import { IERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract RewardsVaultTest is Test {
  WeatherXM public wxm;
  RewardsVault public rewardsVault;
  address internal owner = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
  address internal alice;
  address internal bob;
  address internal rewardsDistributor;
  uint256 public constant maxDailyEmission = 14246 * 10 ** 18;

  function setUp() external {
    alice = address(0x1);
    vm.label(alice, "Alice");
    bob = address(0x2);
    vm.label(bob, "Bob");
    rewardsDistributor = address(0x3);
    vm.label(rewardsDistributor, "rewardsDistributor");

    vm.startPrank(owner);
    wxm = new WeatherXM("WeatherXM", "WXM");
    rewardsVault = new RewardsVault(IERC20(wxm), rewardsDistributor);
    vm.stopPrank();
  }

  function testConstructor() public {
    vm.startPrank(owner);
    wxm = new WeatherXM("WeatherXM", "WXM");
    rewardsVault = new RewardsVault(IERC20(wxm), rewardsDistributor);
    vm.stopPrank();

    assertEq(address(rewardsVault.token()), address(wxm));
    assertEq(rewardsVault.rewardDistributor(), rewardsDistributor);
    assertEq(rewardsVault.owner(), owner);
  }

  function testPullDailyEmissions() public {
    vm.startPrank(owner);
    wxm.transfer(address(rewardsVault), 55000000 * 10 ** 18);
    vm.stopPrank();

    vm.startPrank(rewardsDistributor);

    assertEq(wxm.balanceOf(rewardsDistributor), 0);
    rewardsVault.pullDailyEmissions();
    assertEq(wxm.balanceOf(rewardsDistributor), maxDailyEmission);

    vm.stopPrank();
  }

  function testPullDailyEmissionsSmallAmountRemaining() public {
    vm.startPrank(owner);
    wxm.transfer(address(rewardsVault), 10000 * 10 ** 18);
    vm.stopPrank();

    vm.startPrank(rewardsDistributor);

    assertEq(wxm.balanceOf(rewardsDistributor), 0);
    rewardsVault.pullDailyEmissions();
    assertEq(wxm.balanceOf(rewardsDistributor), 10000 * 10 ** 18);

    vm.stopPrank();
  }

  function testPullDailyEmissionsRateLimit() public {
    vm.startPrank(owner);
    wxm.transfer(address(rewardsVault), 55000000 * 10 ** 18);
    vm.stopPrank();

    vm.startPrank(rewardsDistributor);

    assertEq(wxm.balanceOf(rewardsDistributor), 0);
    rewardsVault.pullDailyEmissions();
    assertEq(wxm.balanceOf(rewardsDistributor), maxDailyEmission);

    vm.expectRevert(RewardsVault.EmissionsRateLimitingInEffect.selector);
    rewardsVault.pullDailyEmissions();

    vm.stopPrank();
  }

  function testPullDailyEmissionsWrongCaller() public {
    vm.startPrank(owner);
    wxm.transfer(address(rewardsVault), 55000000 * 10 ** 18);
    vm.stopPrank();

    vm.startPrank(alice);
    vm.expectRevert(RewardsVault.OnlyRewardDistributor.selector);
    rewardsVault.pullDailyEmissions();
    vm.stopPrank();
  }

  function testSetRewardDistributor() public {
    vm.startPrank(owner);

    rewardsVault.setRewardDistributor(alice);

    vm.stopPrank();

    assertEq(rewardsVault.rewardDistributor(), alice);
  }

  function testSetRewardDistributorWrongCaller() public {
    vm.startPrank(alice);

    vm.expectRevert("Ownable: caller is not the owner");
    rewardsVault.setRewardDistributor(alice);

    vm.stopPrank();
  }
}
