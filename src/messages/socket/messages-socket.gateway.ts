import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { MessagesSocketService } from "./messages-socket.service";
import { Server, Socket } from "socket.io";
import { Message } from "src/messages/domain/message";

@WebSocketGateway({
  namespace: "MessagesSoket",
  cors: {
    origin: "*",
  },
})
export class MessagesSocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesSocketService: MessagesSocketService) {}

  @SubscribeMessage("healthcheck")
  healthcheck() {
    return "Ok";
  }

  emitCreate(payload: Message): void {
    this.server.emit("post", payload);
  }

  emitUpdate(payload: Message): void {
    this.server.emit("patch", payload);
  }

  @SubscribeMessage("join")
  joinRoom(
    @MessageBody("name") name: string,
    @ConnectedSocket() client: Socket
  ) {
    console.log("🚀 ~ MessagesSocketGateway ~ client:", client);
    console.log("🚀 ~ MessagesSocketGateway ~ name:", name);
    // join a room
    // TODO: implement Auth
  }

  @SubscribeMessage("typing")
  typing() {
    // typing a message
  }
}
