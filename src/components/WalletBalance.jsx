import { ethers } from "ethers";
import { useState } from "react";

const WalletBalance = () => {
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const [account] = await provider.send("eth_requestAccounts", []);

    const balance = await provider.getBalance(account);

    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div>
      <div>
        <h5>Your Balance: {balance}</h5>
        <button onClick={() => getBalance()}>Show My Balance</button>
      </div>
    </div>
  );
};

export default WalletBalance;
