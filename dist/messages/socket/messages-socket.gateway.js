"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesSocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_socket_service_1 = require("./messages-socket.service");
const socket_io_1 = require("socket.io");
let MessagesSocketGateway = class MessagesSocketGateway {
    constructor(messagesSocketService) {
        this.messagesSocketService = messagesSocketService;
    }
    healthcheck() {
        return "Ok";
    }
    emitCreate(payload) {
        this.server.emit("post", payload);
    }
    emitUpdate(payload) {
        this.server.emit("patch", payload);
    }
    joinRoom(name, client) {
        console.log("🚀 ~ MessagesSocketGateway ~ client:", client);
        console.log("🚀 ~ MessagesSocketGateway ~ name:", name);
    }
    typing() {
    }
};
exports.MessagesSocketGateway = MessagesSocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesSocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("healthcheck"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesSocketGateway.prototype, "healthcheck", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("join"),
    __param(0, (0, websockets_1.MessageBody)("name")),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessagesSocketGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("typing"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesSocketGateway.prototype, "typing", null);
exports.MessagesSocketGateway = MessagesSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: "MessagesSoket",
        cors: {
            origin: "*",
        },
    }),
    __metadata("design:paramtypes", [messages_socket_service_1.MessagesSocketService])
], MessagesSocketGateway);
//# sourceMappingURL=messages-socket.gateway.js.map