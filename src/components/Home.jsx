import { ethers } from "ethers";
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
    const parsed = parseInt(count._hex, 16);
    setTotalMinted(parsed);
  };

  return (
    <div>
      <WalletBalance />

      <h1>Weirdows NFT Collection</h1>
      <h4>Total NFTs minted: {totalMinted}</h4>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Array(totalMinted + 1)
          .fill(0)
          .map((value, idx) => {
            return (
              <div key={idx}>
                <NFTImage tokenID={idx} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;

const NFTImage = ({ tokenID }) => {
  const contentID = "QmQLTyyKSaoM9jCX7wB77wpebqFvuoZYjGaMCY3EuhAgGH";
  const metadataURI = `${contentID}/${tokenID}.json`;

  const imageURI = `https://magenta-domestic-rooster-792.mypinata.cloud/ipfs/${contentID}/${tokenID}.png`;

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    getMintedStatus();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);

    alert(uri);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 10,
      }}
    >
      <img
        src={
          isMinted
            ? imageURI
            : "https://png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-question-mark-icon-png-image_1024598.jpg"
        }
        style={{ maxWidth: 300, maxHeight: 300 }}
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
