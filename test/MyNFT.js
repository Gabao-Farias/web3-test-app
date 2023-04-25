import { expect } from "chai";
import hre from "hardhat";

describe("MyNFT", function () {
    it("Should mint and transfer a NFT to someone", async function () {

        const Weirdows = await hre.ethers.getContractFactory("Weirdows");
        const weirdows = await Weirdows.deploy();
        await weirdows.deployed();

        const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        const metadataURI = 'cid/test.png';

        let balance = await weirdows.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await weirdows.payToMint(recipient, metadataURI, {value: hre.ethers.utils.parseEther('0.05')});

        await newlyMintedToken.wait();

        balance = await weirdows.balanceOf(recipient);
        expect(balance).to.equal(1);

        expect(await weirdows.isContentOwned(metadataURI)).to.equal(true);
    });
});
