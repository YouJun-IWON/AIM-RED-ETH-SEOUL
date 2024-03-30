import { useState } from "react";
// Viem 라이브러리에서 필요한 함수와 객체를 임포트합니다.
import { createPublicClient, parseEther } from "viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as viemchains from "viem/chains";
// 컴포넌트와 UI 요소를 임포트합니다.
import Loader from "~~/components/shared/Loader";
import { Button } from "~~/components/ui/button";

const MintButton = ({ imgUrl, inverseMessages }: any) => {
  const [loading, setIsLoading] = useState(false);

  // WalletClient와 PublicClient를 생성합니다.
  const client = createWalletClient({
    chain: viemchains.astarZkatana,
    transport: http("https://rpc.zkatana.gelato.digital"),
  });

  const publicClient = createPublicClient({
    chain: viemchains.astarZkatana,
    transport: http("https://rpc.zkatana.gelato.digital"),
  });

  // 오너의 개인키를 사용하여 계정을 생성합니다.
  // 주의: 실제 애플리케이션에서 개인키를 하드코딩하는 것은 매우 위험합니다.
  // 여기서는 예시를 위해 사용되었습니다.
  const account = privateKeyToAccount("0x637ebbb7e2bdc1eaba3174525103c530d32be6465345c6a8e18e2b24eabc8570");

  // mint 함수를 호출합니다.
  const mintNFT = async () => {
    setIsLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        account,
        address: "0x8d4D3DBC384f9855FFE29c474c2F8DAD3ccd76c9", // 스마트 컨트랙트 주소
        abi: [
          {
            inputs: [
              { internalType: "address", name: "to", type: "address" },
              { internalType: "string", name: "tokenURI", type: "string" },
              { internalType: "string", name: "userOutput", type: "string" },
              { internalType: "string", name: "userInput", type: "string" },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "mint",
        args: [
          "0x61327612EC4aFD93e370eC0599f933bB08020A54",
          imgUrl,
          inverseMessages[0],
          JSON.stringify(inverseMessages),
        ],
      });
      const result = await client.writeContract(request);
      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
    setIsLoading(false);
  };

  return <Button onClick={mintNFT}>{loading ? <Loader /> : "2. Mint NFT"}</Button>;
};

export default MintButton;
