# RewardPool

This contract is used to handle the reward distribution among users. To save gas we opted to go for users claiming the tokens (by utilizing a Merkle tree) instead of us sending the tokens.

## Access Control

The contract is using OpenZeppelin’s AccessControlEnumerableUpgradeable contract for fine-grained access control. The two roles that are defined are the following:

- `DISTRIBUTOR_ROLE`: Handles anything that has to do with reward distribution, like updating the Merkle root, claim wait period, or manually transferring rewards to users using their proof.
- `UPGRADER_ROLE`: Used to authorize upgrades to the contract’s logic.

Both of these roles are managed by the DEFAULT_ADMIN_ROLE which on deployment is set to the deployer of the contract.

## Rewards cycles

Each reward distribution is represented by a new cycle on the RewardPool contract `mapping(uint256 => bytes32) public roots`. Each cycle is a new Merkle root in the roots mapping. We are following this approach because the number of users eligible for rewards can become very high as new stations are created or traded. If every new Merkle tree had the info of all the users then the proofs required would constantly become higher thus increasing the cost for the user to claim. By using claiming cycles we are able to only include the users eligible for a reward on each new cycle (this number will never be more that the station owners).

The total amount of rewards a user can claim is stored on the latest cycle this user is part of and the amount of rewards they have claimed is stored in the claims mapping `mapping(address => uint256) public claims`. This means that the users can either claim all of their rewards from the latest cycle (which is the total allocated to the user since the beginning) or claim individual cycles while the claims mapping guarantees that the users can never claim more than they allocated rewards.

## Setting the rewards Merkle root

Whoever holds the `DISTRIBUTOR_ROLE` (which in our case will be controlled by the DAO) is able to update the Merkle root for the rewards distribution. Every time a new Merkle root is submitted a new cycle starts in the contract. New Merkle roots can only be submitted once a day.

When adding a new Merkle root the caller must specify the amount of rewards that are being distributed in that cycle. The Reward Pool will try to pull the rewards from the Reward's vault, if that fails the transaction will revert. The Reward's vault will send as much as it can up to the daily emission amount (as described in the whitepaper). If the Reward's vault send more than what is being distributed the difference will be send to the rewards distribution change treasury.

If we have not submitted a Merkle root for `n` then we can submit `n+1` Merkle roots

## Rewards Claiming

Claiming the rewards requires proof validation for the amount the user is eligible to claim along with some sanity checks. After the proof is verified and the sanity checks pass the claimed amount for the user is updated, the total claimed rewards are updated and the rewards are transferred to the user.

Meta transaction claiming is also supported. The user must provide the transaction sender with a signature to allow him to send the transaction on behalf of the user. In this case the sender of the transaction can take a pre-agreed fee (must be signed by the user) from the claimed rewards for sending the transaction.

## Updating the reward claim period

The `DISTRIBUTOR_ROLE` is able to update the wait period between the two steps of claiming. This will affect any claims in the process of requesting.
