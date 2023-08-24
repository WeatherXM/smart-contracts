# ServicePool

The ServicePool contract is used to process on-chain payments for the services the DAO offers.

## Access Control

The contract is using OpenZeppelin’s AccessControlEnumerableUpgradeable contract for fine-grained access control. The two roles that are defined are

- `SERVICE_MANAGER_ROLE`: Handles adding, removing, and updating the service catalog
- `UPGRADER_ROLE`: Used to authorize upgrades to the contract’s logic.

Both of these roles are managed by the DEFAULT_ADMIN_ROLE which on deployment is set to the deployer of the contract.

## Service Catalog

This contract maintains a service catalog of the available services, service identifiers, minimum order quantity, and cost per service. For this, we are using two state variables:

- `mapping(string => Service) public serviceCatalog`; Mapping from service id to service
- `string[] public serviceIndex`; Array with all the currently available services

## Purchasing services

Services can be purchased with either a designated basePaymentToken `(function purchaseService(uint256 duration, string memory serviceID))` or using WXM through `(function purchaseService(uint256 amount, uint256 duration, string memory serviceID))`.

The prices in the service catalog are denominated in the basePaymentToken.

When purchasing with the basePaymentToken the contract will verify the amount before transferring and all that is required by the user is approval.

When paying with WXM is up to the user to specify the correct amount by doing the conversion to the basePaymentToken. In this case, no verification will happen on the contract but the purchase will be considered invalid and no license will be issued for the service.

## Managing services

Services can be added, updated and removed using:

- addService
- updateServiceVPU
- updateServiceMOQ
- deleteServcice

## Updating the base payment token

The basePaymentToken can be updated at any time by the SERVICE_MANAGER_ROLE. After updating, the new asset will automatically be considered the new base currency for the sale of services.
