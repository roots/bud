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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.boot = void 0;
const postcss_purgecss_1 = __importDefault(require("@fullhuman/postcss-purgecss"));
const wp = __importStar(require("purgecss-with-wordpress"));
const boot = bud => {
    bud.store.set('presets.purgecss', { wp });
};
exports.boot = boot;
const purge = function configuration(userOptions) {
    this.build.items.mutate('postcss.options.postcssOptions.plugins', plugins => [...plugins, postcss_purgecss_1.default(userOptions)]);
    return this;
};
const api = () => ({
    purge,
});
exports.api = api;
//# sourceMappingURL=index.js.map