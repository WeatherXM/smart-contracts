// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { Vm } from "forge-std/Vm.sol";
import { DSTest } from "ds-test/test.sol";
import { Test } from "forge-std/Test.sol";
import { WeatherXM } from "src/WeatherXM.sol";
import { BurnPool } from "src/BurnPool.sol";
import { WeatherStationXM } from "src/WeatherStationXM.sol";
import { IWeatherStationXM } from "src/interfaces/IWeatherStationXM.sol";
import { BurnPoolV2 } from "src/mocks/utils/BurnPoolV2.test.sol";
import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import { IWeatherXM } from "src/interfaces/IWeatherXM.sol";
import { IBurnPool } from "src/interfaces/IBurnPool.sol";
import { IWeatherXM } from "src/interfaces/IWeatherXM.sol";
import { MockV3Aggregator } from "src/mocks/oracle/MockV3Aggregator.sol";
import { MintableERC20 } from "src/mocks/token/MintableERC20.sol";

contract BurnPoolTest is Test {
  address internal tokenImplementation;
  address internal weatherStationImplementation;
  MintableERC20 public testToken;
  IBurnPool public burnImplementation;
  IWeatherStationXM public weatherStationXM;
  address internal alice;
  address internal bob;
  address internal owner;
  ERC1967Proxy public proxy;
  BurnPool public wrappedProxyV1;
  BurnPoolV2 public wrappedProxyV2;
  uint256 public initialAmount = 18000000;
  uint8 public constant DECIMALS = 18;
  int256 public constant INITIAL_ANSWER = 1 * 10 ** 18;
  MockV3Aggregator public mockV3Aggregator;
  string IPFS_CID = "Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu";
  bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
  bytes32 public constant PROVISIONER_ROLE = keccak256("PROVISIONER_ROLE");
  address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);

  function setUp() external {
    weatherStationImplementation = address(new WeatherStationXM("WeatherStationXM", "WSXM"));
    weatherStationXM = IWeatherStationXM(weatherStationImplementation);
    tokenImplementation = address(new MintableERC20("WeatherXM", "WXM"));
    testToken = MintableERC20(tokenImplementation);
    mockV3Aggregator = new MockV3Aggregator(DECIMALS, INITIAL_ANSWER);
    owner = address(0x0);
    vm.label(owner, "Owner");
    alice = address(0x1);
    vm.label(alice, "Alice");
    bob = address(0x2);
    vm.label(bob, "Bob");
    vm.startPrank(owner);
    burnImplementation = new BurnPool();
    proxy = new ERC1967Proxy(address(burnImplementation), "");
    wrappedProxyV1 = BurnPool(address(proxy));
    wrappedProxyV1.initialize(
      tokenImplementation,
      address(weatherStationImplementation)
    );
    vm.stopPrank();
    //grant role to BurnPool (inside weatherStationXM) in order to be able
    //to provision NFTs when burning onboarding fee
    weatherStationXM.grantRole(PROVISIONER_ROLE, address(wrappedProxyV1));
  }

  function testDeployerHasDefaultAdminRole() public {
    assertEq(wrappedProxyV1.hasRole(0x0000000000000000000000000000000000000000000000000000000000000000, owner), true);
  }

  function testCanUpgrade() public {
    vm.startPrank(owner);
    BurnPoolV2 implementationV2 = new BurnPoolV2();
    wrappedProxyV1.upgradeTo(address(implementationV2));
    // re-wrap the proxy
    wrappedProxyV2 = BurnPoolV2(address(proxy));
    assertEq(wrappedProxyV2.version(), "V2");
    vm.stopPrank();
  }

  function testBurnForServiceInput(uint256 amount) public {
    emit log_uint(amount);
    vm.assume(amount > 0 ether);
    vm.startPrank(bob);
    testToken.mint(amount);
    testToken.approve(address(proxy), amount);
    wrappedProxyV1.burnForService(amount, "Weather Forecast");
    vm.stopPrank();
  }

  function testBurnForServiceZeroInput() public {
    vm.startPrank(bob);
    vm.expectRevert(bytes4(keccak256("AmountRequestedIsZero()")));
    wrappedProxyV1.burnForService(0, "Weather Forecast");
    vm.stopPrank();
  }

  function testBurnForServiceLessAllowanceThanRequested() public {
    vm.startPrank(bob);
    testToken.mint(10 * 10 ** 18);
    testToken.approve(address(proxy), 10 * 10 ** 18);
    vm.expectRevert("ERC20: insufficient allowance");
    wrappedProxyV1.burnForService(11 * 10 ** 18, "Weather Forecast");
    vm.stopPrank();
  }

  function testBurnOnboardingFee(uint256 amount) public {
    vm.assume(amount > 0 ether);
    vm.startPrank(owner);
    wrappedProxyV1.grantRole(MANUFACTURER_ROLE, bob);
    assertEq(wrappedProxyV1.hasRole(MANUFACTURER_ROLE, bob), true);
    vm.stopPrank();
    vm.startPrank(bob);
    testToken.mint(amount);
    testToken.approve(address(proxy), amount);
    wrappedProxyV1.burnOnboardingFee(amount, IPFS_CID);
    vm.stopPrank();
  }

  function testBurnOnboardingFeeWhenAmountZero() public {
    vm.startPrank(owner);
    wrappedProxyV1.grantRole(MANUFACTURER_ROLE, bob);
    assertEq(wrappedProxyV1.hasRole(MANUFACTURER_ROLE, bob), true);
    vm.stopPrank();
    vm.startPrank(bob);
    vm.expectRevert(bytes4(keccak256("AmountRequestedIsZero()")));
    wrappedProxyV1.burnOnboardingFee(0, IPFS_CID);
    vm.stopPrank();
  }

  function testBurnOnboardingFeeLessAllowanceThanRequested() public {
    vm.startPrank(owner);
    wrappedProxyV1.grantRole(MANUFACTURER_ROLE, bob);
    assertEq(wrappedProxyV1.hasRole(MANUFACTURER_ROLE, bob), true);
    vm.stopPrank();
    vm.startPrank(bob);
    testToken.mint(10 * 10 ** 18);
    testToken.approve(address(proxy), 10 * 10 ** 18);
    vm.expectRevert("ERC20: insufficient allowance");
    wrappedProxyV1.burnOnboardingFee(11 * 10 ** 18, IPFS_CID);
    vm.stopPrank();
  }
}
