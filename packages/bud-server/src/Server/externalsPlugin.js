"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const fetchExternals_1 = __importDefault(require("./fetchExternals"));
const windowVariables_1 = require("./windowVariables");
const externalsPlugin = (_context, request, callback) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const externalsMap = yield fetchExternals_1.default();
    if (externalsMap[request] || windowVariables_1.windowVariables[request]) {
        return callback(null, (_a = externalsMap[request]) !== null && _a !== void 0 ? _a : windowVariables_1.windowVariables[request]);
    }
    return callback();
});
exports.default = externalsPlugin;
//# sourceMappingURL=externalsPlugin.js.map