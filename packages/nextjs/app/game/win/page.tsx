"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import GenImageButton from "./_components/GenImage";
import MintButton from "./_components/Mint";
import ChatMessages from "~~/components/accordian-stage/LLMs/components/ChatMessages";
import { Button } from "~~/components/ui/button";
import { MessagesContext } from "~~/context/messages";
import useAIImageServer from "~~/hooks/getAIServer.tsx/useAIImageServer";

const WinPage = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages];

  return (
    <div className="flex flex-1 items-center justify-center mt-30 bg-black">
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

          <div className="flex gap-6">
            <MintButton imgUrl={imgUrl} inverseMessages={inverseMessages} />

            <Button>3. Enroll Market</Button>
            <Button>Complete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinPage;
