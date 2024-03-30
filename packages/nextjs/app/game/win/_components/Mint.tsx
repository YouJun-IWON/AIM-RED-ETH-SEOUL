import { parseEther } from "viem";
import { createWalletClient, http } from "viem";
import Loader from "~~/components/shared/Loader";
import { Button } from "~~/components/ui/button";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const MintButton = ({ imgUrl, inverseMessages }: any) => {
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "RedTeamNFT",
    functionName: "mint",
    args: [imgUrl, inverseMessages[0], inverseMessages],
    value: parseEther("0"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return <Button onClick={() => writeAsync()}>{isLoading ? <Loader /> : "2. Mint NFT"}</Button>;
};

export default MintButton;
