"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHandler = void 0;
const terminate_1 = __importDefault(require("./terminate"));
const processHandler = (error) => {
    process.exitCode = 1;
    process.nextTick(() => {
        console.error(error);
        terminate_1.default();
    });
};
exports.processHandler = processHandler;
//# sourceMappingURL=processHandler.js.map