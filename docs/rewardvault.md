# RewardVault

The daily amount to be transferred into the RewardPool follows the [Token Emissions](./emissions.md).

## Funding

RewardPool is the contract that enables the claiming of rewards for the weather station owners. RewardPool is funded in a daily basis from RewardVault

The `rewardDistributor` is the only one who can pull the daily emission by invoking the function `function pullDailyEmissions()`.


## RewardVault Rules

Holds all the rewards that will be distributed by the RewardPool contract.
 - Tokens are released based on the emissions schedule for rewards described in the tokenomics
 - The contract is non-upgradable
 - The contract is ownable
 - Only one address is authorized to pull rewards from the contract
 - The owner can only control who is authorized to pull rewards
 - The release schedule cannot be changed
 - Tokens can be sent to this contract at any time and will be released based on a schedule which follows the [Token Emissions](./emissions.md)
 - Tokens are released on daily intervals from the firs release
 - If tokens are not pulled for `n` days then then we can pull for `n+1` days
