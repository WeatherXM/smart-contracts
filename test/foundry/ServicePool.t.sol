// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Vm } from "forge-std/Vm.sol";
import { DSTest } from "ds-test/test.sol";
import { Test } from "forge-std/Test.sol";
import { WeatherXM } from "src/WeatherXM.sol";
import { ServicePool } from "src/ServicePool.sol";
import { WeatherStationXM } from "src/WeatherStationXM.sol";
import { IWeatherStationXM } from "src/interfaces/IWeatherStationXM.sol";
import { ServicePoolV2 } from "src/mocks/utils/ServicePoolV2.test.sol";
import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import { IWeatherXM } from "src/interfaces/IWeatherXM.sol";
import { IServicePool } from "src/interfaces/IServicePool.sol";
import { IWeatherXM } from "src/interfaces/IWeatherXM.sol";
import { MintableERC20 } from "src/mocks/token/MintableERC20.sol";
//solhint-disable-next-line no-console
import { console } from "forge-std/console.sol";

contract ServicePoolTest is Test {
  MintableERC20 public wxm;
  MintableERC20 public usdc;
  MintableERC20 public usdt;
  IServicePool public servicePoolImplementation;
  IWeatherStationXM public weatherStationXM;
  address internal alice;
  address internal bob;
  address internal owner;
  address internal treasury;
  ERC1967Proxy public proxy;
  ServicePool public servicePool;
  ServicePoolV2 public wrappedProxyV2;
  uint256 public initialAmount = 18000000;
  uint8 public constant DECIMALS = 18;
  int256 public constant INITIAL_ANSWER = 1 * 10 ** 18;
  string IPFS_CID = "Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu";
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
  bytes32 public constant SERVICE_MANAGER_ROLE = keccak256("SERVICE_MANAGER_ROLE");
  address internal admin = address(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);

  function setUp() external {
    wxm = new MintableERC20("WeatherXM", "WXM");
    usdc = new MintableERC20("USDC", "USDC");
    usdt = new MintableERC20("USDC", "USDC");
    owner = address(0x1);
    vm.label(owner, "Owner");
    alice = address(0x2);
    vm.label(alice, "Alice");
    bob = address(0x3);
    vm.label(bob, "Bob");
    treasury = address(0x4);
    vm.label(treasury, "Treasury");
    vm.startPrank(owner);
    servicePoolImplementation = new ServicePool();
    proxy = new ERC1967Proxy(address(servicePoolImplementation), "");
    servicePool = ServicePool(address(proxy));
    servicePool.initialize(address(wxm), address(usdc), treasury);
    vm.stopPrank();
  }

  function testInitCorrectly() public {
    wxm = new MintableERC20("WeatherXM", "WXM");
    usdc = new MintableERC20("USDC", "USDC");
    usdt = new MintableERC20("USDC", "USDC");
    owner = address(0x1);
    vm.label(owner, "Owner");
    alice = address(0x2);
    vm.label(alice, "Alice");
    bob = address(0x3);
    vm.label(bob, "Bob");
    treasury = address(0x4);
    vm.label(treasury, "Treasury");
    vm.startPrank(owner);
    servicePoolImplementation = new ServicePool();
    proxy = new ERC1967Proxy(address(servicePoolImplementation), "");
    servicePool = ServicePool(address(proxy));
    servicePool.initialize(address(wxm), address(usdc), treasury);

    address initializedWxmToken = address(servicePool.wxm());
    address initializedBasePaymentToken = address(servicePool.basePaymentToken());
    address initializedTreasury = servicePool.treasury();

    assertEq(initializedWxmToken, address(wxm));
    assertEq(initializedBasePaymentToken, address(usdc));
    assertEq(initializedTreasury, treasury);

    vm.stopPrank();
  }

  function testDeployerHasDefaultAdminRole() public {
    assertEq(servicePool.hasRole(0x0000000000000000000000000000000000000000000000000000000000000000, owner), true);
  }

  function testAddService() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);
  }

  function testAddDuplicateService() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 20, 100);

    vm.expectRevert(IServicePool.ServiceIdAlreadyExists.selector);
    servicePool.addService("serviceId1", "service2", 20, 100);
  }

  function testAddServiceWithoutRole() public {
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x09717ac20005278352439ebfe1b489a0fa1eccb8e4f93830ef8886bb58ec7bc5"
    );
    servicePool.addService("serviceId1", "service1", 20, 100);
  }

  function testUpdateServiceVpu() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);

    servicePool.updateServiceVPU("serviceId1", 30);

    (
      uint256 indexAfterUpdate,
      string memory nameAfterUpdate,
      uint256 moqAfterUpdate,
      uint256 vpuAfterUpdate
    ) = servicePool.getServiceByID("serviceId1");

    assertEq(index, indexAfterUpdate);
    assertEq(name, nameAfterUpdate);
    assertEq(moq, moqAfterUpdate);
    assertEq(vpuAfterUpdate, 30);
  }

  function testUpdateServiceVpuWithoutRole() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x09717ac20005278352439ebfe1b489a0fa1eccb8e4f93830ef8886bb58ec7bc5"
    );
    servicePool.updateServiceVPU("serviceId1", 30);

    (
      uint256 indexAfterUpdate,
      string memory nameAfterUpdate,
      uint256 moqAfterUpdate,
      uint256 vpuAfterUpdate
    ) = servicePool.getServiceByID("serviceId1");

    assertEq(index, indexAfterUpdate);
    assertEq(name, nameAfterUpdate);
    assertEq(moq, moqAfterUpdate);
    assertEq(vpu, vpuAfterUpdate);

    vm.stopPrank();
  }

  function testUpdateNonExistentService() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);

    vm.expectRevert(IServicePool.InvalidServiceId.selector);
    servicePool.updateServiceVPU("serviceId2", 30);

    vm.stopPrank();
  }

  function testUpdateServiceMoq() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);

    servicePool.updateServiceMOQ("serviceId1", 30);

    (
      uint256 indexAfterUpdate,
      string memory nameAfterUpdate,
      uint256 moqAfterUpdate,
      uint256 vpuAfterUpdate
    ) = servicePool.getServiceByID("serviceId1");

    assertEq(index, indexAfterUpdate);
    assertEq(name, nameAfterUpdate);
    assertEq(moqAfterUpdate, 30);
    assertEq(vpu, vpuAfterUpdate);
  }

  function testUpdateServiceMoqWithoutRole() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x09717ac20005278352439ebfe1b489a0fa1eccb8e4f93830ef8886bb58ec7bc5"
    );
    servicePool.updateServiceMOQ("serviceId1", 30);

    (
      uint256 indexAfterUpdate,
      string memory nameAfterUpdate,
      uint256 moqAfterUpdate,
      uint256 vpuAfterUpdate
    ) = servicePool.getServiceByID("serviceId1");

    assertEq(index, indexAfterUpdate);
    assertEq(name, nameAfterUpdate);
    assertEq(moq, moqAfterUpdate);
    assertEq(vpu, vpuAfterUpdate);

    vm.stopPrank();
  }

  function testUpdateMOQNonExistentService() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);

    vm.expectRevert(IServicePool.InvalidServiceId.selector);
    servicePool.updateServiceMOQ("serviceId2", 30);

    vm.stopPrank();
  }

  function testDeleteService() public {
    vm.startPrank(owner);
    uint256 addedAtIndex = servicePool.addService("serviceId1", "service1", 20, 100);
    assertEq(addedAtIndex, 0);
    (uint256 index, string memory name, uint256 moq, uint256 vpu) = servicePool.getServiceByID("serviceId1");

    assertEq(index, 0);
    assertEq(name, "service1");
    assertEq(moq, 20);
    assertEq(vpu, 100);

    uint256 servicesCount = servicePool.getServiceCount();
    assertEq(servicesCount, 1);

    servicePool.deleteService("serviceId1");

    uint256 servicesCountAfterDelete = servicePool.getServiceCount();
    assertEq(servicesCountAfterDelete, 0);

    vm.stopPrank();
  }

  function testDeleteServiceWhenMoreServicesExist() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 10, 100);
    servicePool.addService("serviceId2", "service2", 20, 200);
    servicePool.addService("serviceId3", "service3", 30, 300);
    servicePool.addService("serviceId4", "service4", 40, 400);

    uint256 servicesCount = servicePool.getServiceCount();
    assertEq(servicesCount, 4);

    servicePool.deleteService("serviceId2");

    uint256 servicesCountAfterDelete = servicePool.getServiceCount();
    assertEq(servicesCountAfterDelete, 3);

    (uint256 index1, string memory name1, uint256 moq1, uint256 vpu1) = servicePool.getServiceByID("serviceId1");

    assertEq(index1, 0);
    assertEq(name1, "service1");
    assertEq(moq1, 10);
    assertEq(vpu1, 100);

    (uint256 index3, string memory name3, uint256 moq3, uint256 vpu3) = servicePool.getServiceByID("serviceId3");

    assertEq(index3, 2);
    assertEq(name3, "service3");
    assertEq(moq3, 30);
    assertEq(vpu3, 300);

    (uint256 index4, string memory name4, uint256 moq4, uint256 vpu4) = servicePool.getServiceByID("serviceId4");

    assertEq(index4, 1);
    assertEq(name4, "service4");
    assertEq(moq4, 40);
    assertEq(vpu4, 400);

    vm.stopPrank();
  }

  function testDeleteServiceWithoutRole() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 20, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x09717ac20005278352439ebfe1b489a0fa1eccb8e4f93830ef8886bb58ec7bc5"
    );
    servicePool.deleteService("serviceId1");

    vm.stopPrank();
  }

  function testDeleteServiceNonExistent() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 20, 100);

    vm.expectRevert(IServicePool.InvalidServiceId.selector);
    servicePool.deleteService("serviceId2");

    vm.stopPrank();
  }

  function testPurchaseServiceWXM() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 10, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    wxm.mint(1000);
    wxm.approve(address(servicePool), 800);

    servicePool.purchaseService(800, 10, "serviceId1");

    uint256 aliceBalance = wxm.balanceOf(alice);
    uint256 treasuryBalance = wxm.balanceOf(treasury);

    assertEq(aliceBalance, 200);
    assertEq(treasuryBalance, 800);

    vm.stopPrank();
  }

  function testPurchaseServiceWXMNotEnoughBalance() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 10, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    wxm.mint(1000);
    wxm.approve(address(servicePool), 8000);

    vm.expectRevert("ERC20: transfer amount exceeds balance");
    servicePool.purchaseService(8000, 10, "serviceId1");

    vm.stopPrank();
  }

  function testPurchaseServiceWXMNotEnoughAllowance() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 10, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    wxm.mint(1000);
    wxm.approve(address(servicePool), 800);

    vm.expectRevert("ERC20: insufficient allowance");
    servicePool.purchaseService(900, 10, "serviceId1");

    vm.stopPrank();
  }

  function testPurchaseServiceWXMInvalidService() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 20, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    wxm.mint(1000);
    wxm.approve(address(servicePool), 800);

    vm.expectRevert(IServicePool.InvalidServiceId.selector);
    servicePool.purchaseService(800, 10, "serviceId2");

    vm.stopPrank();
  }

  function testPurchaseServiceStableCoin() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 5, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    usdc.mint(1000);
    usdc.approve(address(servicePool), 800);

    servicePool.purchaseService(8, "serviceId1");

    uint256 aliceBalance = usdc.balanceOf(alice);
    uint256 treasuryBalance = usdc.balanceOf(treasury);

    assertEq(aliceBalance, 200);
    assertEq(treasuryBalance, 800);

    vm.stopPrank();
  }

  function testPurchaseServiceStableCoinNotEnoughBalance() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 5, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    usdc.mint(1000);
    usdc.approve(address(servicePool), 8000);

    vm.expectRevert("ERC20: transfer amount exceeds balance");
    servicePool.purchaseService(80, "serviceId1");

    vm.stopPrank();
  }

  function testPurchaseServiceStableCoinNotEnoughAllowance() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 5, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    usdc.mint(1000);
    usdc.approve(address(servicePool), 799);

    vm.expectRevert("ERC20: insufficient allowance");
    servicePool.purchaseService(8, "serviceId1");

    vm.stopPrank();
  }

  function testPurchaseServiceStableCoinInvalidService() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 20, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    usdc.mint(1000);
    usdc.approve(address(servicePool), 800);

    vm.expectRevert(IServicePool.InvalidServiceId.selector);
    servicePool.purchaseService(8, "serviceId2");

    vm.stopPrank();
  }

  function testSetBasePaymentToken() public {
    vm.startPrank(owner);

    address basePaymentToken = address(servicePool.basePaymentToken());

    assertEq(basePaymentToken, address(usdc));

    servicePool.setBasePaymentToken(address(usdt));

    address basePaymentTokenAfterUpdate = address(servicePool.basePaymentToken());

    assertEq(basePaymentTokenAfterUpdate, address(usdt));

    vm.stopPrank();
  }

  function testSetBasePaymentTokenAndPurchase() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 8, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    usdc.mint(1000);
    usdc.approve(address(servicePool), 800);

    servicePool.purchaseService(8, "serviceId1");

    uint256 aliceBalance = usdc.balanceOf(alice);
    uint256 treasuryBalance = usdc.balanceOf(treasury);

    assertEq(aliceBalance, 200);
    assertEq(treasuryBalance, 800);

    usdt.mint(1000);
    usdt.approve(address(servicePool), 800);

    vm.expectRevert("ERC20: insufficient allowance");
    servicePool.purchaseService(8, "serviceId1");

    vm.stopPrank();
    vm.startPrank(owner);

    servicePool.setBasePaymentToken(address(usdt));

    vm.stopPrank();
    vm.startPrank(alice);

    servicePool.purchaseService(8, "serviceId1");

    vm.stopPrank();
  }

  function testSetBasePaymentTokenWithoutRole() public {
    vm.startPrank(alice);

    vm.expectRevert(
      "AccessControl: account 0x0000000000000000000000000000000000000002 is missing role 0x09717ac20005278352439ebfe1b489a0fa1eccb8e4f93830ef8886bb58ec7bc5"
    );
    servicePool.setBasePaymentToken(address(usdt));

    vm.stopPrank();
  }

  function testPurchaseServiceWXMBellowMOQ() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 20, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    wxm.mint(1000);
    wxm.approve(address(servicePool), 800);

    vm.expectRevert(IServicePool.BellowMOQ.selector);
    servicePool.purchaseService(800, 10, "serviceId1");

    vm.stopPrank();
  }

  function testPurchaseServiceStableCoinBellowMOQ() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 10, 100);

    vm.stopPrank();
    vm.startPrank(alice);

    usdc.mint(1000);
    usdc.approve(address(servicePool), 800);

    vm.expectRevert(IServicePool.BellowMOQ.selector);
    servicePool.purchaseService(8, "serviceId1");

    vm.stopPrank();
  }

  function testGetServiceAtIndex() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 10, 100);
    servicePool.addService("serviceId2", "service2", 20, 200);
    servicePool.addService("serviceId3", "service3", 30, 300);
    servicePool.addService("serviceId4", "service4", 40, 400);

    string memory serviceId = servicePool.getServiceAtIndex(1);

    assertEq(serviceId, "serviceId2");
  }

  function testPurchaseServiceWXMPaused() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 10, 100);
    servicePool.pause();

    vm.stopPrank();
    vm.startPrank(alice);

    wxm.mint(1000);
    wxm.approve(address(servicePool), 800);

    vm.expectRevert("Pausable: paused");
    servicePool.purchaseService(800, 10, "serviceId1");

    vm.stopPrank();
    vm.startPrank(owner);

    servicePool.unpause();

    vm.stopPrank();
    vm.startPrank(alice);

    servicePool.purchaseService(800, 10, "serviceId1");

    uint256 aliceBalance = wxm.balanceOf(alice);
    uint256 treasuryBalance = wxm.balanceOf(treasury);

    assertEq(aliceBalance, 200);
    assertEq(treasuryBalance, 800);

    vm.stopPrank();
  }

  function testPurchaseServiceStableCoinPaused() public {
    vm.startPrank(owner);
    servicePool.addService("serviceId1", "service1", 5, 100);
    servicePool.pause();

    vm.stopPrank();
    vm.startPrank(alice);

    usdc.mint(1000);
    usdc.approve(address(servicePool), 800);

    vm.expectRevert("Pausable: paused");
    servicePool.purchaseService(8, "serviceId1");

    vm.stopPrank();
    vm.startPrank(owner);

    servicePool.unpause();

    vm.stopPrank();
    vm.startPrank(alice);

    servicePool.purchaseService(8, "serviceId1");

    uint256 aliceBalance = usdc.balanceOf(alice);
    uint256 treasuryBalance = usdc.balanceOf(treasury);

    assertEq(aliceBalance, 200);
    assertEq(treasuryBalance, 800);

    vm.stopPrank();
  }
}
