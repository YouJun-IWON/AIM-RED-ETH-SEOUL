import { useState } from "react";
import { parseEther } from "viem";
import { createWalletClient, http } from "viem";
import Loader from "~~/components/shared/Loader";
import { Button } from "~~/components/ui/button";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { cn } from "~~/utils/cn";

const MintButton = ({ imgUrl, inverseMessages, setCount, count }: any) => {
  const [receipt, setReceipt] = useState("");
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "RedTeamNFT",
    functionName: "mint",
    args: [imgUrl, inverseMessages[0], inverseMessages],
    value: parseEther("0"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      setReceipt(txnReceipt.blockHash);
      setCount(2);
    },
  });

  return (
    <div className="text-center flex flex-col justify-center w-full items-center">
      <Button
        disabled={count !== 1}
        onClick={() => writeAsync()}
        className={cn(count === 1 ? "bg-red-800" : "", "w-[200px]")}
      >
        {isLoading ? <Loader /> : "2. Mint NFT"}
      </Button>
      {receipt && receipt}
    </div>
  );
};

export default MintButton;
