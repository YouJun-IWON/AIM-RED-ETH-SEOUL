import React from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "./shared/Loader";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import shortenAddress from "~~/utils/shortenAddress";

/**
 * Site footer
 */
export const Footer = () => {
  const { address, isConnecting } = useAccount();
  console.log("account", address);

  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "RedTeamNFT",
    functionName: "successCount",
    args: [address],
  });

  return (
    <div className="">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {address ? (
              isConnecting ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <div className="flex gap-4">
                  <Image src="/red-member.png" width={150} height={150} alt="profile" />
                  <span className="">
                    <p className="text-3xl">{shortenAddress(address)}</p>
                    <p>
                      {Number(totalCounter) <= 2 ? (
                        <Image src="/bronze.png" width={80} height={80} alt="" />
                      ) : Number(totalCounter) <= 4 ? (
                        <Image src="/silver.png" width={80} height={80} alt="" />
                      ) : Number(totalCounter) <= 6 ? (
                        <Image src="/gold.png" width={80} height={80} alt="" />
                      ) : (
                        <Image src="/platinum.png" width={80} height={80} alt="" />
                      )}
                    </p>
                  </span>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
