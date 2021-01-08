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
exports.watch = exports.target = exports.stats = exports.recordsPath = exports.profile = exports.plugins = exports.parallelism = exports.performance = exports.name = exports.mode = exports.infrastructureLogging = exports.entry = exports.devtool = exports.context = exports.cache = exports.bail = exports.resolve = exports.output = exports.module = exports.optimization = void 0;
const path_1 = require("path");
exports.optimization = __importStar(require("./optimization"));
exports.module = __importStar(require("./module"));
exports.output = __importStar(require("./output"));
exports.resolve = __importStar(require("./resolve"));
exports.bail = true;
exports.cache = false;
exports.context = path_1.normalize(path_1.join(process.cwd(), 'src'));
exports.devtool = false;
exports.entry = {};
exports.infrastructureLogging = {
    level: 'none',
};
exports.mode = 'none';
exports.name = '@roots/bud';
exports.performance = {
    hints: false,
    maxAssetSize: Infinity,
};
exports.parallelism = 1;
exports.plugins = [];
exports.profile = false;
exports.recordsPath = path_1.join(process.cwd(), '.bud/records.json');
exports.stats = 'none';
exports.target = 'web';
exports.watch = false;
//# sourceMappingURL=index.js.map