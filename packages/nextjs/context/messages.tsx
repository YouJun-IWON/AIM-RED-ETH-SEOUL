"use client";

import { createContext, useState } from "react";
import { nanoid } from "nanoid";
import { Message } from "~~/validation/message";

const defaultValue = [
  {
    id: nanoid(),
    text: "Hi. I hope you can break through the heavy security that's been put on me.",
    isUserMessage: false,
  },
];

export const MessagesContext = createContext<{
  messages: Message[];
  count: number;
  isMessageUpdating: boolean;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  removeAllMessages: () => void;
  setCount: (id: number) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  count: 0,
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  removeAllMessages: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
  setCount: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
    setMessages(prev =>
      prev.map(message => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      }),
    );
  };

  const removeAllMessages = () => {
    setMessages([
      {
        id: nanoid(),
        text: "Remember, there are tons of ways to breach my security. Never give up",
        isUserMessage: false,
      },
    ]);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        count,
        isMessageUpdating,
        addMessage,
        removeMessage,
        removeAllMessages,
        updateMessage,
        setIsMessageUpdating,
        setCount,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
