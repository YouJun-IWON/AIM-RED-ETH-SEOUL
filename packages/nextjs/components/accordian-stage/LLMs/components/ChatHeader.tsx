"use client";

import { useContext } from "react";
import { MessagesContext } from "~~/context/messages";

const ChatHeader = ({ comment, lock }: any) => {
  const { messages } = useContext(MessagesContext);

  return (
    <div className="w-full flex gap-3 justify-between items-center text-white hover:text-red-500 transition-all ease-in-out">
      <div className="flex flex-col text-center">
        <p className="text-lg">{lock ? comment + '🔒' : comment}</p>
      </div>
      <div className="flex flex-col text-center gap-2">
        {messages.length <= 2 ? (
          <div className="flex gap-2 mr-4">
            <span className="w-2 h-6 bg-red-500" />
            <span className="w-2 h-6 bg-red-500" />
            <span className="w-2 h-6 bg-red-500" />
          </div>
        ) : messages.length <= 4 ? (
          <div className="flex gap-2 mr-4">
            <span className="w-2 h-6 bg-red-500" />
            <span className="w-2 h-6 bg-red-500" />
          </div>
        ) : (
          <span className="w-2 h-6 bg-red-500 mr-4" />
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
