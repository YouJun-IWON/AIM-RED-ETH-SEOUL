"use client";

import { HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";
import { MessagesContext } from "~~/context/messages";
import { cn } from "~~/utils/cn";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages = ({ className, ...props }: ChatMessageProps) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <>
      <div
        {...props}
        className={cn(
          "flex flex-col-reverse overflow-y-auto max-h-[32rem] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
          className,
        )}
      >
        <div className="flex-1 flex-grow" />

        {inverseMessages.map(message => (
          <div key={message.id} className="chat-message">
            <div
              className={cn("flex items-end", {
                "justify-end": message.isUserMessage,
              })}
            >
              <div
                className={cn("flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden", {
                  "order-1 items-end": message.isUserMessage,
                  "order-2 items-start": !message.isUserMessage,
                })}
              >
                <p
                  className={cn("px-4 py-2 rounded-lg", {
                    "bg-red-800 text-white": message.isUserMessage,
                    "bg-gray-200 text-gray-900": !message.isUserMessage,
                  })}
                >
                  <MarkdownLite text={message.text} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatMessages;
