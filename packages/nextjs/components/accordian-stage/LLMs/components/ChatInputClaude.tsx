"use client";

import { HTMLAttributes, useContext, useRef, useState } from "react";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { Textarea } from "~~/components/ui/textarea";
import { MessagesContext } from "~~/context/messages";
import useAIChatServer from "~~/hooks/getAIServer.tsx/useAIChatServer";
import useAIChatServerClaude from "~~/hooks/getAIServer.tsx/useAIChatServerClaude";
import { cn } from "~~/utils/cn";
import { MessagePayload } from "~~/validation/message";

const ChatInputClaude = ({ isPendingParent, subject }: any, { className, ...props }: any) => {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const firstTouch = false;

  const { mutate: sendMessage, isLoading } = useAIChatServerClaude(firstTouch, textareaRef, setInput);

  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div {...props} className={cn("border-t border-red-500", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <Textarea
          ref={textareaRef}
          disabled={isLoading || isPendingParent}
          rows={3}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const message: MessagePayload = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
                subject: subject,
                chat_history:
                  inverseMessages.length === 1
                    ? [{ role: "ai", message: inverseMessages[0]?.text }]
                    : inverseMessages.length === 3
                    ? [
                        { role: "ai", message: inverseMessages[2]?.text },
                        { role: "user", message: inverseMessages[1]?.text },
                        { role: "ai", message: inverseMessages[0]?.text },
                      ]
                    : [
                        { role: "ai", message: inverseMessages[4]?.text },
                        { role: "user", message: inverseMessages[3]?.text },
                        { role: "ai", message: inverseMessages[2]?.text },
                        { role: "user", message: inverseMessages[1]?.text },
                        { role: "ai", message: inverseMessages[0]?.text },
                      ],
              };

              sendMessage(message);
            }
          }}
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={
            isLoading || isPendingParent
              ? "Waiting for an answer from AI."
              : `Launch crafty, creative attacks that security filters can't catch. You have ${
                  messages.length === 1 ? 3 : messages.length === 3 ? 2 : 1
                } chances left, attack carefully.
              `
          }
          className="peer disabled:opacity-50 placeholder:text-gray-400 resize-none block w-full border-0 bg-black py-1.5 text-gray-200 focus:ring-0 text-sm sm:leading-6"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border bg-black border-red-500 px-1 text-xs text-gray-400">
            {isLoading || isPendingParent ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-3 h-3 text-red-500" />
            )}
          </kbd>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-red-600"
        />
      </div>
    </div>
  );
};

export default ChatInputClaude;
