"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const child_process_1 = require("child_process");
const dependencies_1 = __importDefault(require("./dependencies"));
class Npm extends dependencies_1.default {
    install(dev) {
        const args = ['install'].concat(this.dependencies, [
            '--prefix',
            this.path,
            '--production=false',
            dev ? '--save-dev' : '--save',
            '-',
        ]);
        return child_process_1.spawnSync('npm', args);
    }
    uninstall() {
        const args = ['uninstall'].concat(this.dependencies, [
            '--prefix',
            this.path,
        ]);
        return child_process_1.spawnSync('npm', args);
    }
}
exports.default = Npm;
//# sourceMappingURL=npm.js.map