import { useEffect, useState } from "react";

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
  }
};

export default NFTImage;
