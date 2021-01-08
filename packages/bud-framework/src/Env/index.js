"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bud_support_1 = require("@roots/bud-support");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
class default_1 extends bud_support_1.ServiceContainer {
    register() {
        var _a;
        this.setStore((_a = dotenv_1.default.config({
            path: path_1.join(process.cwd(), '.env'),
        }).parsed) !== null && _a !== void 0 ? _a : {});
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map