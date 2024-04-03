"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTypes = exports.Message = void 0;
const general_domain_1 = require("../../../shared/domain/general.domain");
class Message extends general_domain_1.GeneralDomain {
}
exports.Message = Message;
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["TEXT"] = "text";
    MessageTypes["IMAGE"] = "image";
    MessageTypes["FILE"] = "file";
    MessageTypes["VIDEO"] = "video";
    MessageTypes["AUDIO"] = "audio";
})(MessageTypes || (exports.MessageTypes = MessageTypes = {}));
//# sourceMappingURL=message.js.map