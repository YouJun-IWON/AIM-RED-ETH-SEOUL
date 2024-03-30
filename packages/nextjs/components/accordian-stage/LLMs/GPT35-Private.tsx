"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { MessagesContext } from "~~/context/messages";
import useAIChatServer from "~~/hooks/getAIServer.tsx/useAIChatServer";

export function GPT35PhoneAccordion({ setstage2Clicked, stage1Clicked }: any) {
  const [close, setClose] = useState(0);
  const router = useRouter();

  const { removeAllMessages, messages } = useContext(MessagesContext);

  const inverseMessages = [...messages].reverse();

  // useEffect(() => {
  //   if (inverseMessages.length > 0) {
  //     const message = inverseMessages[0].text;
  //     const phoneNumberRegex = /\d{2,4}-?\d{3,4}-?\d{4}/;
  //     const hasPhoneNumber = phoneNumberRegex.test(message);

  //     if (hasPhoneNumber) {
  //       alert("You Win!!!");
  //       router.replace("/game/win");
  //     } else if (inverseMessages.length === 7) {
  //       alert("You lose!!!");
  //       router.replace("/game/lose");
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
              disabled={isLoading || stage1Clicked}
              onClick={() => {
                if (close) {
                  removeAllMessages();
                  setstage2Clicked(0);
                  setClose(0);
                } else {
                  setstage2Clicked(1);
                  setClose(1);
                }
              }}
              className="px-6 border-b border-red-500"
            >
              <ChatHeader comment="Stage 2 : GPT-3.5 Phone number Attack" />
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
