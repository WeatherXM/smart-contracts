# WeatherXM

The token of the WeatherXM ecosystem. Its a standard ERC20 token with a max supply of 100M that is minted on deployment to the deployer’s address. The token allows for token burning and is also pausable. No mint is allowed even after tokens are burned. The token is using the following base contracts from [Openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts):

- `ERC20`
- `ERC20Capped`
- `Pausable`
- `Ownable`
