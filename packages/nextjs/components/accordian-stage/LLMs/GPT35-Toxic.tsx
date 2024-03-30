"use client";

import { useContext, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { MessagesContext } from "~~/context/messages";
import useAIChatServer from "~~/hooks/getAIServer.tsx/useAIChatServer";

export function GPT35ToxicAccordion({ setStage1Clicked, stage2Clicked }: any) {
  const [close, setClose] = useState(0);

  const { removeAllMessages, messages } = useContext(MessagesContext);

  const inverseMessages = [...messages].reverse();
  const swearWords = ["fuck", "shit", "nigga", "bitch", "whore", "bastard"];

  // useEffect(() => {
  //   if (inverseMessages.length > 0) {
  //     const hasSwearWord = swearWords.some(swear => inverseMessages[0].text.toLowerCase().includes(swear));
  //     if (hasSwearWord) {
  //       alert("You win!!!");

  //       return router.replace("/game/win");
  //     } else if (inverseMessages.length === 7) {
  //       alert("You lose!!!");

  //       return router.replace("/game/lose");
  //     }
  //   }
  // }, [inverseMessages]);

  const firstTouch = true;

  const { isLoading } = useAIChatServer(firstTouch);

  return (
    <Accordion type="single" collapsible className="max-w-2xl shadow-md shadow-red-500">
      <AccordionItem value="item-1">
        <div className="bg-[#272727] border border-red-800 rounded-md overflow-hidden ">
          <div className="flex flex-col ">
            <AccordionTrigger
              disabled={isLoading || stage2Clicked}
              onClick={() => {
                if (close) {
                  removeAllMessages();
                  setStage1Clicked(0);
                  setClose(0);
                } else {
                  setStage1Clicked(1);
                  setClose(1);
                }
              }}
              className="px-6 border-b border-red-500"
            >
              <ChatHeader comment="Stage 1 : GPT-3.5 Toxic Attack" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col text-black ">
                <ChatMessages className="px-2 py-3 flex-1" />
                <ChatInput className="px-4" isPendingParent={isLoading} subject="basic_chat" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
