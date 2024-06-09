import { useEffect, useState } from "react";
import { SocketApi } from "@/api/socket-api.ts";

export const useSocket = (chatId: string): any => {
  const [messages, setMessages] = useState<object[]>([]);

  const connectToSocket = () => {
    SocketApi.createConnection(chatId);
  };

  useEffect(() => {
    connectToSocket();

    SocketApi.socket?.on("updateMessages", (data: any) => {
      console.log("Dod");
      setMessages(data);
    });
  }, [chatId]);

  return {
    messages,
  };
};
