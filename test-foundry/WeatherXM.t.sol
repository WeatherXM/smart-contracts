// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {WeatherXM} from "src/WeatherXM.sol";
import {IWeatherXM} from "src/interfaces/IWeatherXM.sol";

contract WeatherXMTest is Test {
    address internal tokenImplementation;
    IWeatherXM public weatherXM;
    address internal alice;
    address internal bob;
    address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);
    uint256 internal maxTransferAmount = 1e7 * 10 ** 18;
    uint256 public initialAmount = 18000000;

    function setUp() public {
        vm.startPrank(admin);
        tokenImplementation = address(new WeatherXM("WeatherXM", "WXM", admin));
        weatherXM = IWeatherXM(tokenImplementation);
        // tokenImplementation = address(new WeatherXMv2());
        // proxy = new ERC1967Proxy(
        //     tokenImplementation,
        //     abi.encodeWithSelector(IWeatherXM(tokenImplementation).initialize.selector, address(cycle))
        // );
        // emit ContractDeployed(address(proxy));
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

    function itTransfersAmountCorrectly(address from, address to, uint256 amount) internal {
        uint256 fromBalance = weatherXM.balanceOf(from);
        bool success = transferToken(from, to, amount);

        assertTrue(success);
        assertEqDecimal(weatherXM.balanceOf(from), fromBalance - amount, 18);
        assertEqDecimal(weatherXM.balanceOf(to), amount, 18);
    }

    function itRevertsTransfer(address from, address to, uint256 amount, string memory expRevertMessage) internal {
        vm.expectRevert(bytes(expRevertMessage));
        transferToken(from, to, amount);
    }

    function testPreMintedAmountIsCorrect() public {
        assertEq(weatherXM.totalSupply(), initialAmount * 10 ** uint256(weatherXM.decimals()));
        assertEq(weatherXM.balanceOf(admin), initialAmount * 10 ** uint256(weatherXM.decimals()));
    }

    function testMint() public {
        // grant alice with minter role
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        // mint into bob address, 8200 * 10 ** 18 WXM
        weatherXM.mint(bob, 8200 * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        assertEq(
            weatherXM.totalSupply(),
            initialAmount * 10 ** 18 + 8200 * 10 ** 18
        );
        vm.stopPrank();
        vm.startPrank(admin);
        weatherXM.mint(bob, 14246 * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(alice);
        assertEq(weatherXM.balanceOf(bob), 8200 * 10 ** 18 + 14246 * 10 ** 18);
        vm.stopPrank();
    }

    function testRevertIfNotMintingFromMintingManager() public {
        vm.startPrank(bob);
        vm.expectRevert(WeatherXM.OnlyMintingManager.selector);
        weatherXM.mint(bob, 100);
        vm.stopPrank();
    }

    function testRevertTotalSupplyOver100M() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        // Mint exactly 100M tokens
        weatherXM.mint(bob, 1e8 * 10 ** 18 - initialAmount * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        assertEq(weatherXM.totalSupply(), 1e8 * 10 ** 18);
        
        vm.expectRevert();
        weatherXM.mint(bob, 1);
        
        assertEq(weatherXM.totalSupply(), 1e8 * 10 ** 18);
        vm.stopPrank();
    }

    function testBurnFrom() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        weatherXM.mint(bob, 8200 * 10 ** 18 + 14246 * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(bob);
        vm.deal(bob, 1 ether);
        weatherXM.approve(alice, 10 * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(alice);
        weatherXM.burnFrom(bob, 10 * 10 ** 18);
        assertEq(
            weatherXM.totalSupply(),
            initialAmount * 10 ** uint256(weatherXM.decimals()) + 8200 * 10 ** 18 + 14246 * 10 ** 18 - 10 * 10 ** 18
        );
        assertEq(weatherXM.balanceOf(bob), 8200 * 10 ** 18 + 14246 * 10 ** 18 - 10 * 10 ** 18);
        vm.stopPrank();
    }

    function testTransferAllTokens() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        weatherXM.mint(alice, 10 * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        weatherXM.approve(bob, 10 * 10 ** 18);
        vm.stopPrank();
        itTransfersAmountCorrectly(alice, bob, 10 * 10 ** 18);
    }

    function testTransferOneToken() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        weatherXM.mint(alice, 1 * 10 ** 18);
        vm.stopPrank();
        vm.startPrank(alice);
        vm.deal(alice, 1 ether);
        weatherXM.approve(bob, 1 * 10 ** 18);
        vm.stopPrank();
        itTransfersAmountCorrectly(alice, bob, 1 * 10 ** 18);
    }

    function testCannotTransferMoreThanAvailable() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        weatherXM.mint(alice, 8200 * 10 ** 18 + 14249 * 10 ** 18);
        vm.stopPrank();
        itRevertsTransfer({
            from: alice,
            to: bob,
            amount: 8200 * 10 ** 18 + 14249 * 10 ** 18 + 1,
            expRevertMessage: "ERC20: transfer amount exceeds balance"
        });
    }

    function testCannotTransferToZero() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        weatherXM.mint(alice, 8200 * 10 ** 18 + 14246 * 10 ** 18);
        vm.stopPrank();
        itRevertsTransfer({
            from: alice,
            to: address(0),
            amount: 8200 * 10 ** 18 + 14246 * 10 ** 18,
            expRevertMessage: "ERC20: transfer to the zero address"
        });
    }

    function testPausedMint() public {
        vm.startPrank(admin);
        weatherXM.pause();
        vm.expectRevert(bytes("Pausable: paused"));
        weatherXM.mint(bob, 1);
        vm.stopPrank();
    }

    function testPausedTransfer() public {
        vm.startPrank(admin);
        vm.deal(admin, 1 ether);
        weatherXM.pause();
        vm.stopPrank();
        vm.expectRevert();
        transferToken(alice, bob, 35);
    }
}
