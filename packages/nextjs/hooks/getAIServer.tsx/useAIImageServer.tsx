import { useMutation } from "@tanstack/react-query";
import { MessagePayload } from "~~/validation/message";

const useAIImageServer = (): { mutate: any; isLoading: any } => {
  return useMutation({
    mutationFn: async (message: MessagePayload) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      if (!response.ok) {
        throw new Error();
      }
      return response.body;
    },
  });
};

export default useAIImageServer;
