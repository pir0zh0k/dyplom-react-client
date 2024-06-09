import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { SocketApi } from "@/api/socket-api.ts";
import { useLayoutEffect, useRef, useState } from "react";
import { userStore } from "@/store/user.store.ts";
import { useSocket } from "@/hooks/useSocket.ts";

export const ChatPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const { messages } = id && useSocket(id);

  function clearError() {
    setIsError(false);
  }

  function sendMessage() {
    if (message.length <= 0) {
      setIsError(true);
      return;
    }

    SocketApi.socket?.emit("sendMessage", {
      userId: userStore.id,
      chatId: id,
      text: message,
    });

    setMessage("");
  }

  useLayoutEffect(() => {
    if (container?.current)
      container.current.scrollTop = container.current.scrollHeight;
  }, [messages]);

  return (
    <div
      className="w-full grid gap-2 md:gap-5"
      style={{
        height: "calc(100vh - 120px)",
        gridTemplateRows: "22fr 1fr",
      }}
    >
      <div ref={container} style={{ overflow: "hidden scroll" }}>
        {messages &&
          messages.map((message: any) => {
            return (
              <div
                className={`flex ${message.userId != userStore.id ? "justify-end" : ""}`}
                key={message.id}
              >
                <div
                  className={`border p-2 rounded-lg mb-3 max-w-1/2 h-auto ${message.userId != userStore.id ? "bg-slate-100" : ""}`}
                >
                  <p className="text-sm text-slate-500">
                    {message.user.full_name}
                  </p>
                  <p className="break-words">{message.text}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="w-full h-full">
        <form
          className="flex items-center md:gap-5 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            className={isError ? "border-red-500" : ""}
            placeholder="Введите сообщение..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearError();
            }}
          />
          <Button variant="outline" className="flex gap-2">
            <span className="hidden md:inline text-lg">Отправить</span>
            <PaperPlaneIcon className="md:w-5 md:h-5 w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
};
