"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("./Service"));
const options_1 = __importDefault(require("./options"));
const bud_support_1 = require("@roots/bud-support");
/**
 * Compiler
 */
class default_1 extends Service_1.default {
    constructor() {
        super(...arguments);
        this.statsOptions = options_1.default;
    }
    register() {
        this.get = this.get.bind(this);
        this.run = this.run.bind(this);
        this.set = this.set.bind(this);
        this.compile = this.compile.bind(this);
        this.applyPlugins = this.applyPlugins.bind(this);
    }
    get() {
        return this.instance;
    }
    set(compiler) {
        this.instance = compiler;
    }
    compile() {
        return (this.instance = bud_support_1.webpack(this.app.build.make()));
    }
    run() {
        this.instance.run((_err, stats) => {
            this.stats = {
                string: stats.toString(),
                json: stats.toJson(),
            };
        });
    }
    makeError(err) {
        new Error(err);
    }
    applyPlugins(handler) {
        new bud_support_1.ProgressPlugin(handler).apply(this.instance);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map