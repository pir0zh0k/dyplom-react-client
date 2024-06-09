import { io, Socket } from "socket.io-client";

export class SocketApi {
  static socket: null | Socket = null;

  static createConnection(chatId: string) {
    this.socket = io("https://dyplom-backend-mmcb.onrender.com", {
      query: { chatId },
    });

    this.socket.on("connect", () => {
      console.log("Connection success");
    });

    this.socket.on("disconnect", (e) => {
      console.log("Connection disconnected");
      console.log(e);
    });
  }
}
