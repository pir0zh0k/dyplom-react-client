import { useEffect, useState } from "react";
import { useChat } from "@/services/chat.service.ts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { CreateChatForm } from "@/components/sections/forms/CreateChatForm.tsx";

export const ChatsPage = () => {
  const [chats, setChats] = useState<object[]>();

  useEffect(() => {
    useChat.getChats().then((res) => {
      setChats(res.data);
    });
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ваши чаты:</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Создать чат</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создание чата:</DialogTitle>
            </DialogHeader>
            <CreateChatForm />
          </DialogContent>
        </Dialog>
      </div>
      {chats && chats.length > 0 ? (
        chats.map((chat: any) => (
          <div
            className="border rounded-lg p-2 flex items-center justify-between"
            key={chat.id}
          >
            <h2 className="text-lg md:text-xl font-semibold">{chat.name}</h2>
            <Button variant="outline" asChild>
              <Link to={`/chats/${chat.id}`}>Перейти</Link>
            </Button>
          </div>
        ))
      ) : (
        <h2 className="text-center text-slate-500">Пока что у вас нет чатов</h2>
      )}
    </div>
  );
};
