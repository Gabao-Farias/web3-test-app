import { ethers } from "hardhat";
import WalletBalance from "./WalletBalance";

import Weirdows from "../artifacts/contracts/MyNFT.sol/Weirdows.json";
import { useEffect, useState } from "react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// Get the end user
const signer = provider.getSigner();

// Get the smart contract
const contract = new ethers.Contract(contractAddress, Weirdows.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  });

  const getCount = async () => {
    const count = await contract.count();
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>Weirdows NFT Collection</h1>
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div>
            <NFTImage tokenId={i} />
          </div>
        ))}
    </div>
  );
};

export default Home;

const NFTImage = ({ tokenID, getCount }) => {
  const contentID = "QmQLTyyKSaoM9jCX7wB77wpebqFvuoZYjGaMCY3EuhAgGH";
  const metadataURI = `${contentID}/${tokenID}.json`;

  const imageURI = `https://magenta-domestic-rooster-792.mypinata.cloud/ipfs/${contentID}/${tokenID}.png`;

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.await();
    getMintedStatus();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);

    alert(uri);
  }

  return (
    <div>
      <img
        src={
          isMinted
            ? imageURI
            : "https://static.vecteezy.com/ti/vetor-gratis/p3/7126739-icone-de-ponto-de-interrogacao-gratis-vetor.jpg"
        }
      ></img>

      <div>
        <h5>ID #{tokenID}</h5>
        {!isMinted ? (
          <button onClick={mintToken}>Mint</button>
        ) : (
          <button onClick={getURI}>Taken! Show URI</button>
        )}
      </div>
    </div>
  );
};
