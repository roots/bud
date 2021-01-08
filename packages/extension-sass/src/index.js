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
exports.setLoaders = exports.setRules = exports.setItems = exports.register = void 0;
const rule = __importStar(require("./rules"));
const item = __importStar(require("./items"));
const register = (bud) => {
    ;
    ['sass', 'scss'].forEach(ext => {
        !bud.store
            .get('webpack.resolve.extensions')
            .includes(`.${ext}`)
            ? bud.store.mutate('webpack.resolve.extensions', exts => [
                ...exts,
                `.${ext}`,
            ])
            : null;
    });
};
exports.register = register;
exports.setItems = ['sass', item];
exports.setRules = ['sass', rule];
exports.setLoaders = [
    'sass-loader',
    require.resolve('sass-loader'),
];
//# sourceMappingURL=index.js.map