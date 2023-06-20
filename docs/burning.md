# Burn Operation

Burn revenue from services and onboarding fee
The BurnPool contract is used by the users in order to purchase services; the function responsible for burning in order to purchase service is `burnForService` inside [BurnPool](../src/BurnPool.sol).

1. The purchasing process can be summarized in the following steps for all web/ mobile clients. The user:

- chooses the service to purchase in WeatherXM platform,
- gets PO or some kind of service identifier for this specific purchase order,
- approves an X amount of WXM (the dollars counterpart) to be burned by the BurnPool contract through his wallet (i.e. Metamask)
  - the X amount is calculated based on the current price of WXM
- burn X amount of WXM
  - initiate burning by calling the burnForService function,
  - collect burning transaction hash,
  - store hash
- once the transaction receipt is available, the user gets the chosen service

2. The purchasing process can also be made programmaticaly. This is enabled through the dev frameworks, [Web3.js](https://github.com/web3/web3.js/) or [ethersjs](https://github.com/ethers-io/ethers.js/).
   It can be summarized into the following two phases.

**Phase 1**

The user:

- chooses the service to purchase in WeatherXM platform,
- gets PO or some kind of service identifier for this specific purchase order

**Phase 2**

Programmaticaly:

- approve an X amount of WXM which should suffice for the requested service
  - the X amount of WXM should result from the WXM/USD pair. For example if the service cost is equal to
    102 USD and 1 WXM is equal to 0.55 USD, then the user should approve for burning 186 WXM.
- burn X amount of WXM by invoking `burnForService` inside [BurnPool](../src/BurnPool.sol) and passing as parameters the amount to burn,
  186 WXM following the above example and the received service identifier from **Phase 1**.
- then submit for evaluation the transaction receipt from the previous step.
- once the evaluation succeeds then the requested service will be provisioned to the user's account in WeatherXM platform

The process for burning follows a mechanism that utilizes ERC20 `approve` and `burnFrom` functions in [WeatherXM](../src/WeatherXM.sol).

This mechanism solves the following situation:
The user could theoretically transfer his WXM to the BurnPool contract and then call some function on it to burn the already transferred amount. However, that requires two separate transactions, during which, things like exchange rate (on the blockchain) may change. When you call the BurnPool contract function to burn, it will not even "know" that you have previously transferred WXM to the contract.
