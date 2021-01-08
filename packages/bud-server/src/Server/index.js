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
const Service_1 = __importDefault(require("./Service"));
const express_1 = __importDefault(require("express"));
const middleware = __importStar(require("../middleware"));
const injectClient_1 = require("../util/injectClient");
/**
 * ## bud.server
 *
 * Express development server.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 * [🔗 Documentation](#)
 */
class default_1 extends Service_1.default {
    register() {
        this.run = this.run.bind(this);
        this.instance = express_1.default();
        this.app.when(this.app.store.has('args.proxy'), ({ store }) => store.enable('features.proxy'));
    }
    injectHmr() {
        this.app.store.set('webpack.entry', injectClient_1.injectClient(this.app.store));
    }
    run(compiler) {
        const config = this.config;
        this.instance.use(middleware.dev({
            config,
            compiler,
        }));
        this.instance.use(middleware.hot(compiler));
        this.app.store.enabled('features.proxy') &&
            this.instance.use(middleware.proxy(this.config));
        this.instance.listen(this.config.get('port'), this.config.get('host'));
        return this;
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map