"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const bud_support_1 = require("@roots/bud-support");
const Dashboard_1 = require("../containers/Dashboard");
const Service_1 = __importDefault(require("./Service"));
/**
 * CLI
 */
class CLI extends Service_1.default {
    /**
     * Register service
     */
    register() {
        this.kill = this.kill.bind(this);
        this.run = this.run.bind(this);
    }
    /**
     * Mount CLI
     */
    run() {
        if (this.app.store.get('args.ci'))
            return;
        this.dashboard = bud_support_1.render(bud_support_1.React.createElement(Dashboard_1.Dashboard, { bud: this.app }));
    }
    /**
     * Unmount CLI
     */
    kill() {
        this.dashboard.unmount();
    }
}
exports.CLI = CLI;
//# sourceMappingURL=index.js.map