import { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Loader from "~~/components/shared/Loader";
import { Button } from "~~/components/ui/button";

const GetToken = () => {
  const [loading, setIsLoading] = useState(false);
  const { address, connector } = useAccount();

  const getToken = async () => {
    setIsLoading(true);
    const tokenAddress = process.env.NEXT_PUBLIC_ABC_TOKEN_ADDRESS!;
    const transferAbi = ["function transfer (address to, uint amount)"];
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY!;
    const RpcHttpUrl = "https://rpc.zkatana.gelato.digital";

    const provider = ethers.getDefaultProvider(RpcHttpUrl);
    const hexPrivateKey = Buffer.from(privateKey, "hex");
    const signer = new ethers.Wallet(hexPrivateKey, provider);

    const tokenContract = new ethers.Contract(tokenAddress, transferAbi, provider);
    const tokenSigner = tokenContract.connect(signer);

    const tokenAmount = ethers.utils.parseUnits("10.0", 18);
    const transaction = await tokenSigner.transfer(address, tokenAmount);
    console.log("token transfer hash: ", transaction.hash);
    setIsLoading(false);

    alert(`10 tokens transferred to ${address}`);
  };

  return <Button className='bg-red-800' onClick={() => getToken()}>{loading ? <Loader /> : "Get 10 ART Token"}</Button>;
};

export default GetToken;
