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
exports.externals = void 0;
const fetchExternals_1 = __importDefault(require("./fetchExternals"));
const windowVariables_1 = require("./windowVariables");
function externals(data, callback) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const externalsMap = yield fetchExternals_1.default();
        if (externalsMap[data.request] ||
            windowVariables_1.windowVariables[data.request]) {
            return callback(null, (_a = externalsMap[data.request]) !== null && _a !== void 0 ? _a : windowVariables_1.windowVariables[data.request]);
        }
        return callback();
    });
}
exports.externals = externals;
//# sourceMappingURL=externals.js.map