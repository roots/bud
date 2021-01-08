"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
const node_notifier_1 = __importDefault(require("node-notifier"));
function notify(notification, callback) {
    node_notifier_1.default.notify(notification, callback !== null && callback !== void 0 ? callback : undefined);
}
exports.notify = notify;
//# sourceMappingURL=notify.js.map