# Solidity API

## BurnPool

This contract accounts burning WXM tokens for getting services.

_The owner of the contract can view who burnt already and for which service.
Anyone can burn tokens from his account based upon previous approval._

### priceFeed

```solidity
contract IPriceFeedConsumer priceFeed
```

### data

```solidity
contract WeatherXMData data
```

### MANUFACTURER_ROLE

```solidity
bytes32 MANUFACTURER_ROLE
```

### UPGRADER_ROLE

```solidity
bytes32 UPGRADER_ROLE
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _token, address _data, address _weatherstation, address _priceconsumer) public
```

Initialize called on deployment, initiates the contract and its proxy.

_On deployment, some addresses for interacting contracts should be passed._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of WXM contract to be used for burning. |
| _data | address | The address of cycle contract to be used for monitoring when burn took place. |
| _weatherstation | address | The address for WeatherStation contract to mint NFT per station when burning onboarding fee. |
| _priceconsumer | address | The contract address for the WXM price pair to track |

### burnForService

```solidity
function burnForService(uint256 amount, string service) external
```

Burn tokens and store info about the transaction.

_ERC-20 tokens require approval to be spent by third parties.
The user should first approve an amount of WXM to be used by this contract.
Then the following fuction transfers tokens on its address and burns them._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | The amount to be burned. |
| service | string | The service identifier that the end user will receive from the billing system. |

### burnOnboardingFee

```solidity
function burnOnboardingFee(uint256 amount, string uri) external returns (bool)
```

Burn onboarding fee.

_ERC-20 tokens require approval to be spent by third parties.
The user should first approve an amount of WXM to be used by this contract.
Then the following fuction transfers tokens on its address, burns them and mints an NFT for the weather station._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | The amount to burn for onboarding. |
| uri | string | The ipfs URI for the weather station's metadata. |

### pause

```solidity
function pause() public
```

Pause all ops in BurnPool.

_Only the Admin can pause the smart contract._

### unpause

```solidity
function unpause() public
```

Unpause all ops in BurnPool.

_Only the Admin can unpause the smart contract.._

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal
```

_Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
{upgradeTo} and {upgradeToAndCall}.

Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.

```solidity
function _authorizeUpgrade(address) internal override onlyOwner {}
```_

## PriceFeedConsumer

A contract that returns latest price from Chainlink Price Feeds

_The pair for which the price is returned, is selected by the contracts address which is used in constructor
The Admin can change the pair, by setting a new aggregator instance_

### priceFeed

```solidity
contract AggregatorV3Interface priceFeed
```

### constructor

```solidity
constructor(address _priceFeed) public
```

### getLatestPrice

```solidity
function getLatestPrice() external view returns (int256, uint256)
```

Returns the latest price

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | int256 | latest price |
| [1] | uint256 |  |

### setAggregatorInstance

```solidity
function setAggregatorInstance(address _aggregatorInstance) external
```

Change contract address to track for pricefeed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _aggregatorInstance | address | The contract address for the WXM price pair to track |

### getPriceFeed

```solidity
function getPriceFeed() external view returns (contract AggregatorV3Interface)
```

Returns the Price Feed address

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract AggregatorV3Interface | Price Feed address |

## RewardPool

This constract serves as a rewards allocation pool.

### token

```solidity
contract IWeatherXM token
```

### data

```solidity
contract WeatherXMData data
```

### claims

```solidity
mapping(address => uint256) claims
```

### roots

```solidity
mapping(uint256 => bytes32) roots
```

### totalAllocatedRewards

```solidity
uint256 totalAllocatedRewards
```

### claimedRewards

```solidity
uint256 claimedRewards
```

### companyWithdrawals

```solidity
uint256 companyWithdrawals
```

### companyTokensTarget

```solidity
address companyTokensTarget
```

### businessDevTokensTarget

```solidity
address businessDevTokensTarget
```

### latestBusinessDevWithdrawal

```solidity
uint256 latestBusinessDevWithdrawal
```

### businessDevAllocatedTokens

```solidity
mapping(uint256 => uint256) businessDevAllocatedTokens
```

### dailyAllocatedRewards

```solidity
mapping(uint256 => uint256) dailyAllocatedRewards
```

### latestCompanyWithdrawal

```solidity
uint256 latestCompanyWithdrawal
```

### DISTRIBUTOR_ROLE

```solidity
bytes32 DISTRIBUTOR_ROLE
```

### UPGRADER_ROLE

```solidity
bytes32 UPGRADER_ROLE
```

### rateLimit

```solidity
modifier rateLimit(uint256 period)
```

Rate limit for submitting root hashes.

_Every 24h is the minimum limit for submitting root hashes for rewards
due to the fact that every 24h, the minting is going to take place for the first 10ys_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| period | uint256 | The period for which to enforce the rate limit |

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _token, address _data) public
```

### submitMerkleRoot

```solidity
function submitMerkleRoot(bytes32 root, uint256 dailyCumulativeRewards) external returns (bool)
```

Submit root hash for rewards.

_The root hash is calculated of chain and submitted every day.
The root hash is stored also off chain in order to calculate each
recipient's daily proof if requested for withdrawal.
The root hashes are stored in a mapping where the cycle is the accessor.
For every cycle there is only one root hash._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| root | bytes32 | The root hash containing the cumulative rewards plus the daily rewards. |
| dailyCumulativeRewards | uint256 |  |

### getRemainingAllocatedRewards

```solidity
function getRemainingAllocatedRewards(address account, uint256 amount, uint256 cycle, bytes32[] proof) external view returns (uint256)
```

Get remaining rewards to claim.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | The account of the recipient |
| amount | uint256 | The cumulative amount of rewards up to the selected cycle |
| cycle | uint256 | cycle for which to choose the root hash |
| proof | bytes32[] | The recipient's proof |

### allocatedRewardsForProofMinusRewarded

```solidity
function allocatedRewardsForProofMinusRewarded(address account, uint256 amount, uint256 cycle, bytes32[] proof) internal view returns (uint256)
```

Get available balance of rewards.

_Calculate available rewards to claim by substracting from cumultaive rewards the already claim._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | The account of the recipient |
| amount | uint256 | The cumulative amount of rewards up to the selected cycle |
| cycle | uint256 | cycle for which to choose the root hash |
| proof | bytes32[] | The recipient's proof |

### transferRewards

```solidity
function transferRewards(address to, uint256 amount, uint256 totalRewards, uint256 cycle, bytes32[] proof) external returns (bool)
```

Transfer rewards to a recipient.

_Receives the amount and proof for a specific recipient defined by the address and transfers the rewards.
The amount should be lower or equal to the available rewards to transfer._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | The recipient's address |
| amount | uint256 | The amount to transfer (in WEI) |
| totalRewards | uint256 | The cumulative amount of rewards up to the point of the requested cycle |
| cycle | uint256 | The desired cycle for which to choose the root hash |
| proof | bytes32[] | The _proof that enables the claim of the requested amount of tokens |

### transferCompanyTokens

```solidity
function transferCompanyTokens() external
```

Transfer tokens for vesting to a company pool.

### transferBusinessDevTokens

```solidity
function transferBusinessDevTokens() external
```

Transfer remaining tokens from daily rewarding to business development pool.

### setCompanyTarget

```solidity
function setCompanyTarget(address target) external
```

Setup target address for receiving company and investors tokens.

### setBusinessDevTarget

```solidity
function setBusinessDevTarget(address target) external
```

Setup target address for receiving business development tokens.

### verify

```solidity
function verify(address account, uint256 amount, uint256 cycle, bytes32[] proof) internal view returns (uint256)
```

Verify proof for the chosen root hash.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | The account of the recipient |
| amount | uint256 | The cumulative amount of tokens |
| cycle | uint256 | The desired cycle for which to choose the root hash |
| proof | bytes32[] | The _proof that enables the claim of the requested amount of tokens |

### claim

```solidity
function claim(uint256 amount, uint256 totalRewards, uint256 cycle, bytes32[] proof) external
```

Claim rewards.

_Anyone can claim own rewards by submitting the amount and a proof.
The amount should be lower or equal to the available allocated to withdraw._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | The amount of tokens to claim |
| totalRewards | uint256 | The cumulative amount of rewards up to the point of the requested cycle |
| cycle | uint256 | The desired cycle for which to choose the root hash |
| proof | bytes32[] | The _proof that enables the claim of the requested amount of tokens |

### pause

```solidity
function pause() public
```

### unpause

```solidity
function unpause() public
```

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal
```

_Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
{upgradeTo} and {upgradeToAndCall}.

Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.

```solidity
function _authorizeUpgrade(address) internal override onlyOwner {}
```_

## WeatherXMStation

### PROVISIONER_ROLE

```solidity
bytes32 PROVISIONER_ROLE
```

The PROVISIONER_ROLE is assigned to the BurnPool Contract.

### MANUFACTURER_ROLE

```solidity
bytes32 MANUFACTURER_ROLE
```

### constructor

```solidity
constructor(string name, string symbol) public
```

### _baseURI

```solidity
function _baseURI() internal pure returns (string)
```

_Base URI for computing {tokenURI}. If set, the resulting URI for each
token will be the concatenation of the `baseURI` and the `tokenId`. Empty
by default, can be overridden in child contracts._

### mintWeatherStation

```solidity
function mintWeatherStation(address recipient, string uri) external returns (bool)
```

### burn

```solidity
function burn(uint256 tokenId) external
```

### transferWeatherStation

```solidity
function transferWeatherStation(address to, uint256 tokenId) external returns (bool)
```

### exchangeWeatherStations

```solidity
function exchangeWeatherStations(uint256 _tokenId1, uint256 _tokenId2) external returns (bool)
```

### pause

```solidity
function pause() external
```

### unpause

```solidity
function unpause() external
```

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal
```

### _burn

```solidity
function _burn(uint256 tokenId) internal
```

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view returns (string)
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

## WeatherXM

### data

```solidity
contract WeatherXMData data
```

### mintTarget

```solidity
address mintTarget
```

### mintedCompanyTokens

```solidity
uint256 mintedCompanyTokens
```

### mintedRewardTokens

```solidity
uint256 mintedRewardTokens
```

### cycle

```solidity
uint256 cycle
```

### initialAmount

```solidity
uint256 initialAmount
```

### companyCap2y

```solidity
uint256 companyCap2y
```

### companyCap3y

```solidity
uint256 companyCap3y
```

### rewardCap

```solidity
uint256 rewardCap
```

### TotalSupplyShouldNotSurpass100M

```solidity
error TotalSupplyShouldNotSurpass100M()
```

### TokenTransferWhilePaused

```solidity
error TokenTransferWhilePaused()
```

### MintingRateLimitingInEffect

```solidity
error MintingRateLimitingInEffect()
```

### TargetAddressIsZero

```solidity
error TargetAddressIsZero()
```

### TargetAddressIsContractAddress

```solidity
error TargetAddressIsContractAddress()
```

### validDestination

```solidity
modifier validDestination(address _address)
```

### mintingRateLimit

```solidity
modifier mintingRateLimit(uint256 period)
```

Rate limit for minting.

_Every 24h is the minimum limit for minting tokens_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| period | uint256 | The period for which to enforce the rate limit |

### constructor

```solidity
constructor(string _name, string _symbol, address _address) public
```

### mint

```solidity
function mint() public
```

### _mintDaily

```solidity
function _mintDaily() internal
```

### startCycle

```solidity
function startCycle() internal
```

### getCycle

```solidity
function getCycle() external view returns (uint256)
```

### burn

```solidity
function burn(uint256 amount) external
```

### burnFrom

```solidity
function burnFrom(address account, uint256 amount) external
```

### getMintedTokens

```solidity
function getMintedTokens() external view returns (uint256, uint256)
```

### setMintTarget

```solidity
function setMintTarget(address target) external
```

### pause

```solidity
function pause() external
```

### unpause

```solidity
function unpause() external
```

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual
```

_Hook that is called before any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
will be transferred to `to`.
- when `from` is zero, `amount` tokens will be minted for `to`.
- when `to` is zero, `amount` of ``from``'s tokens will be burned.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]._

## WeatherXMData

### dailyCompanyMint

```solidity
mapping(uint256 => uint256) dailyCompanyMint
```

### dailyRewardMint

```solidity
mapping(uint256 => uint256) dailyRewardMint
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize() public
```

### updateDailyCompanyMints

```solidity
function updateDailyCompanyMints(uint256 _cycle, uint256 _amount) public
```

### updateDailyRewardMints

```solidity
function updateDailyRewardMints(uint256 _cycle, uint256 _amount) public
```

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal
```

_Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
{upgradeTo} and {upgradeToAndCall}.

Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.

```solidity
function _authorizeUpgrade(address) internal override onlyOwner {}
```_

## IBurnPool

### AmountRequestedIsZero

```solidity
error AmountRequestedIsZero()
```

### SenderAllowanceIsNotEnough

```solidity
error SenderAllowanceIsNotEnough()
```

### DeviceWasNotOnboarded

```solidity
error DeviceWasNotOnboarded()
```

### BurnedForService

```solidity
event BurnedForService(address from, uint256 amount, int256 price, uint256 timeStamp, string service)
```

_Emitted when `from` burns a specific amount of WXM in order to receive the `service`
This event will serve as a proof of burn in order to provision the `service` to the `recipient`_

### BurnedOnboardingFee

```solidity
event BurnedOnboardingFee(address from, uint256 amount)
```

_Emitted when `from` burns the onboarding fee in order to oboard weatherXM stations and mint NFTs for each one
This event will serve as a proof of burn in order to add the WeatherXM stations into the network_

### burnForService

```solidity
function burnForService(uint256 _amount, string service) external
```

### burnOnboardingFee

```solidity
function burnOnboardingFee(uint256 amount, string uri) external returns (bool)
```

## IPriceFeedConsumer

### setAggregatorInstance

```solidity
function setAggregatorInstance(address _aggregatorInstance) external
```

_Mutative function that enables aggregator instance change._

### getLatestPrice

```solidity
function getLatestPrice() external view returns (int256, uint256)
```

_View function that returns latest price._

### getPriceFeed

```solidity
function getPriceFeed() external view returns (contract AggregatorV3Interface)
```

_View function returns aggragator instance._

## IRewardPool

### RewardsRateLimitingInEffect

```solidity
error RewardsRateLimitingInEffect()
```

_Custom errors_

### NotEnoughRewards

```solidity
error NotEnoughRewards()
```

### CallerShouldNotBeThisContract

```solidity
error CallerShouldNotBeThisContract()
```

### AmountRequestedIsZero

```solidity
error AmountRequestedIsZero()
```

### BalanceIsNotEnough

```solidity
error BalanceIsNotEnough()
```

### TotalRewardsAreZero

```solidity
error TotalRewardsAreZero()
```

### AmountIsOverAvailableRewardsToWithdraw

```solidity
error AmountIsOverAvailableRewardsToWithdraw()
```

### TransferFailed

```solidity
error TransferFailed()
```

### ZeroTokensToTransfer

```solidity
error ZeroTokensToTransfer()
```

### SubmittedRootHash

```solidity
event SubmittedRootHash(uint256 cycle, bytes32 root)
```

_Emitted when root hash is submitted
This event contains the root hash and the cycle indicated when it was submitted_

### Claimed

```solidity
event Claimed(address account, uint256 amount)
```

_Emitted when rewards are claimed by user
This event contains user's address and the amount which was claimed_

### CompanyTokensTransferred

```solidity
event CompanyTokensTransferred(address to, uint256 amount)
```

_Emitted when company tokens are transferred
This event contains the target address for company tokens and the amount_

### BusinessDevTokensTransferred

```solidity
event BusinessDevTokensTransferred(address to, uint256 amount)
```

_Emitted when business development are transferred
This event contains the target address for business development tokens and the amount_

### submitMerkleRoot

```solidity
function submitMerkleRoot(bytes32 root, uint256 dailyTotalRewards) external returns (bool)
```

### transferRewards

```solidity
function transferRewards(address to, uint256 amount, uint256 totalRewards, uint256 cycle, bytes32[] proof) external returns (bool)
```

### transferCompanyTokens

```solidity
function transferCompanyTokens() external
```

### transferBusinessDevTokens

```solidity
function transferBusinessDevTokens() external
```

### setCompanyTarget

```solidity
function setCompanyTarget(address target) external
```

### setBusinessDevTarget

```solidity
function setBusinessDevTarget(address target) external
```

### claim

```solidity
function claim(uint256 amount, uint256 totalRewards, uint256 cycle, bytes32[] proof) external
```

### getRemainingAllocatedRewards

```solidity
function getRemainingAllocatedRewards(address account, uint256 amount, uint256 cycle, bytes32[] proof) external view returns (uint256)
```

### pause

```solidity
function pause() external
```

### unpause

```solidity
function unpause() external
```

## IWeatherXMStation

### RecipientIsContractAddress

```solidity
error RecipientIsContractAddress()
```

_Custom errors_

### CantTransferWSWhenNotOwning

```solidity
error CantTransferWSWhenNotOwning()
```

### CantExchangeWSWhenNotOwning

```solidity
error CantExchangeWSWhenNotOwning()
```

### CallerIsNotTokenOwner

```solidity
error CallerIsNotTokenOwner()
```

### WeatherStationOnboarded

```solidity
event WeatherStationOnboarded(address from, uint256 tokenId)
```

_Emitted when manufacturer burns onboarding fee and mints an NFT per station
This event contains the origin caller address and the token ID for the NFT_

### WeatherStationClaimed

```solidity
event WeatherStationClaimed(address from, uint256 tokenId)
```

_Emitted when a user claims a weather station and its NFT
This event contains the origin caller address and the token ID for the NFT in focus_

### WeatherStationTransfered

```solidity
event WeatherStationTransfered(address from, address to, uint256 tokenId)
```

_Emitted when a user transfers ownership of a weather station and its NFT
This event contains the origin caller address and the token ID for the NFT in focus_

### WeatherStationBurned

```solidity
event WeatherStationBurned(address from, uint256 tokenId)
```

_Emitted when a user burns the NFT and this actions is triggered when the weather station is removed from network
This event contains the origin caller address and the token ID for the NFT in focus_

### mintWeatherStation

```solidity
function mintWeatherStation(address recipient, string uri) external returns (bool)
```

### burn

```solidity
function burn(uint256 tokenId) external
```

### transferWeatherStation

```solidity
function transferWeatherStation(address to, uint256 tokenId) external returns (bool)
```

### exchangeWeatherStations

```solidity
function exchangeWeatherStations(uint256 _tokenId1, uint256 _tokenId2) external returns (bool)
```

### pause

```solidity
function pause() external
```

### unpause

```solidity
function unpause() external
```

## IWeatherXM

### CycleBegan

```solidity
event CycleBegan(uint256 cycle)
```

_Emitted when a cycle is initiated with every mint
This event contains the new cycle_

### mint

```solidity
function mint() external
```

### setMintTarget

```solidity
function setMintTarget(address target) external
```

### burnFrom

```solidity
function burnFrom(address account, uint256 amount) external
```

### burn

```solidity
function burn(uint256 amount) external
```

### getMintedTokens

```solidity
function getMintedTokens() external view returns (uint256, uint256)
```

### getCycle

```solidity
function getCycle() external returns (uint256)
```

### pause

```solidity
function pause() external
```

### unpause

```solidity
function unpause() external
```

## BurnPoolV2

This constract serves as the testing suite for upgradeability.

### test

```solidity
function test() public
```

### version

```solidity
function version() public pure returns (string)
```

## RewardPoolV2

This constract serves as the testing suite for upgradeability.

### test

```solidity
function test() public
```

### version

```solidity
function version() public pure returns (string)
```

## MockV3Aggregator

Based on the FluxAggregator contract
Use this contract when you need to test
other contract's ability to read data from an
aggregator contract, but how the aggregator got
its answer is unimportant

### version

```solidity
uint256 version
```

### decimals

```solidity
uint8 decimals
```

### latestAnswer

```solidity
int256 latestAnswer
```

### latestTimestamp

```solidity
uint256 latestTimestamp
```

### latestRound

```solidity
uint256 latestRound
```

### getAnswer

```solidity
mapping(uint256 => int256) getAnswer
```

### getTimestamp

```solidity
mapping(uint256 => uint256) getTimestamp
```

### constructor

```solidity
constructor(uint8 _decimals, int256 _initialAnswer) public
```

### test

```solidity
function test() public
```

### updateAnswer

```solidity
function updateAnswer(int256 _answer) public
```

### updateRoundData

```solidity
function updateRoundData(uint80 _roundId, int256 _answer, uint256 _timestamp, uint256 _startedAt) public
```

### getRoundData

```solidity
function getRoundData(uint80 _roundId) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
```

### latestRoundData

```solidity
function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
```

### description

```solidity
function description() external pure returns (string)
```

## MintableERC20

_ERC20 minting logic_

### test

```solidity
function test() public
```

### cycle

```solidity
uint256 cycle
```

### constructor

```solidity
constructor(string _name, string _symbol) public
```

### getCycle

```solidity
function getCycle() external view returns (uint256)
```

### mint

```solidity
function mint(uint256 value) public returns (bool)
```

_Function to mint tokens_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | uint256 | The amount of tokens to mint. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | A boolean that indicates if the operation was successful. |

