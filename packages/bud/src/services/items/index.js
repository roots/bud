"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.items = void 0;
const cache = __importStar(require("./cache"));
const css = __importStar(require("./css"));
const file = __importStar(require("./file"));
const extractCss = __importStar(require("./extractCssChunks"));
const raw = __importStar(require("./raw"));
const resolve = __importStar(require("./resolveUrl"));
const style = __importStar(require("./style"));
const svg = __importStar(require("./svg"));
const thread = __importStar(require("./thread"));
// import * as minicss from './minicss'
exports.items = {
    ['cache']: cache,
    ['css']: css,
    ['file']: file,
    ['mini-css']: extractCss,
    ['raw']: raw,
    ['resolve-url']: resolve,
    ['style']: style,
    ['svg']: svg,
    ['thread']: thread,
};
//# sourceMappingURL=index.js.map