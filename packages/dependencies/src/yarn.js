"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const child_process_1 = require("child_process");
const dependencies_1 = __importDefault(require("./dependencies"));
class Yarn extends dependencies_1.default {
    install(dev) {
        const args = ['add'].concat(this.dependencies, [
            '--cwd',
            this.path,
            '--production=false',
        ]);
        if (dev) {
            args.push('--dev');
        }
        return child_process_1.spawnSync('yarn', args);
    }
    uninstall() {
        const args = ['remove'].concat(this.dependencies, [
            '--cwd',
            this.path,
        ]);
        return child_process_1.spawnSync('yarn', args);
    }
}
exports.default = Yarn;
//# sourceMappingURL=yarn.js.map