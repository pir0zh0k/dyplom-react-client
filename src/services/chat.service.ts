import { $withToken } from "@/api";

class ChatService {
  getChats() {
    return $withToken.get("/chat/userChats");
  }

  async createChat(chatName: string, userId: string) {
    return await $withToken.post("/chat/create", {
      name: chatName,
      userId: userId,
    });
  }
}

export const useChat = new ChatService();
