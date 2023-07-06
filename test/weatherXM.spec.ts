import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('WeatherXM', () => {
  describe('Constructor', () => {
    it('should mint the entire supply to the deployer', async () => {
      const [owner] = await ethers.getSigners();
      const Token = await ethers.getContractFactory('WeatherXM');
      const token = await Token.deploy('WeatherXM', 'WXM');

      const totalSupply = await token.totalSupply();
      const ownerBalance = await token.balanceOf(owner.address)

      expect(totalSupply).to.equal(ethers.utils.parseEther(String(100_000_000)))
      expect(ownerBalance).to.equal(ethers.utils.parseEther(String(100_000_000)))
    });
  });
});
