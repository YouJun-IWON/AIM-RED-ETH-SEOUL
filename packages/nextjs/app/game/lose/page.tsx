"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
          <p className="text-3xl">You Lose...</p>

          <div className="p-2 relative border border-1 w-[200px] h-[200px]  border-red-500">
            <Image src="/shortcut.png" fill alt="NFT Image" />
          </div>

          <p className="inline-block text-center w-[400px]">
            Explore another way to attack based on the data I failed. Remember that your failures are never failures,
            but rather a path to success.
          </p>

          <Button onClick={() => router.replace("/game")} className="bg-red-800 w-[200px] mb-6">
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WinPage;
