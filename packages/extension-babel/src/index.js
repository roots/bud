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
exports.boot = exports.setItems = exports.setLoaders = void 0;
const api_1 = require("./api");
const babel = __importStar(require("./babel"));
exports.setLoaders = {
    [`babel-loader`]: require.resolve('babel-loader'),
};
exports.setItems = {
    babel,
};
const boot = app => {
    api_1.make(app);
    app.build.rules.mutate('js', js => (Object.assign(Object.assign({}, js), { use: [
            app.build.items.get('thread'),
            app.build.items.get('cache'),
            app.build.items.get('babel'),
        ].filter(Boolean) })));
};
exports.boot = boot;
//# sourceMappingURL=index.js.map