// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";

const Weirdows = await hre.ethers.getContractFactory("Weirdows");
const weirdows = await Weirdows.deploy();

await weirdows.deployed();

console.log(`Deployed to ${weirdows.address}`);
