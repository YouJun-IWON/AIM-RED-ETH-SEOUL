"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GenImageButton from "./_components/GenImage";
import GetTokenReward from "./_components/GetTokenReward";
import MintButton from "./_components/Mint";
import ChatMessages from "~~/components/accordian-stage/LLMs/components/ChatMessages";
import { Button } from "~~/components/ui/button";
import { MessagesContext } from "~~/context/messages";
import useAIImageServer from "~~/hooks/getAIServer.tsx/useAIImageServer";
import { cn } from "~~/utils/cn";

const WinPage = () => {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages];

  return (
    <div className="flex flex-1 items-center justify-center mt-30 bg-black py-3">
      <div className="w-full grid grid-cols-2 items-center justify-center px-10 gap-10">
        <div className="border border-1 border-red-600">
          <ChatMessages className="px-2 py-3 flex-1" />
        </div>

        <div className="border border-1 flex flex-col items-center justify-center gap-4">
          <p className="text-3xl">You Win!!!</p>
          {imgUrl ? (
            <div className="p-2 relative border border-1 w-[200px] h-[200px]  border-red-500">
              <Image src={imgUrl} fill alt="NFT Image" />
            </div>
          ) : (
            <div className="p-2 border border-1 border-red-500 w-[200px] h-[200px]"></div>
          )}

          <GenImageButton
            count={count}
            setImgUrl={setImgUrl}
            setCount={setCount}
            setLoading={setLoading}
            loading={loading}
          />

          <div className="flex flex-col gap-4 justify-center items-center">
            <MintButton imgUrl={imgUrl} inverseMessages={inverseMessages} setCount={setCount} count={count} />

            <GetTokenReward setCount={setCount} count={count} />
            <Button
              onClick={() => router.replace("/")}
              disabled={count !== 3}
              className={cn(count === 3 ? "bg-red-800" : "", "mb-6 w-[200px]")}
            >
              4. Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinPage;
