"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const bud_support_1 = require("@roots/bud-support");
const Screen_1 = __importDefault(require("../../Screen"));
const Warning_1 = require("./Warning");
const Warnings = ({ warnings }) => (warnings === null || warnings === void 0 ? void 0 : warnings.length) > 0
    ? warnings === null || warnings === void 0 ? void 0 : warnings.map((warning, i) => (bud_support_1.React.createElement(Screen_1.default, { key: i, title: "Warnings" },
        bud_support_1.React.createElement(Warning_1.Warning, { message: warning, key: i })))) : null;
exports.default = Warnings;
//# sourceMappingURL=index.js.map