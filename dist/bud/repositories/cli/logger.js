"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.logger = void 0;
var pino_1 = __importDefault(require("pino"));
var logger = pino_1["default"]();
exports.logger = logger;
//# sourceMappingURL=logger.js.map