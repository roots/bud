"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const yarn_1 = __importDefault(require("./yarn"));
const npm_1 = __importDefault(require("./npm"));
class Dependencies {
    constructor(dependencies, path = process.cwd()) {
        this.dependencies = [].concat(dependencies);
        this.path = path;
    }
    get client() {
        if (this.isYarn()) {
            return new yarn_1.default(this.dependencies, this.path);
        }
        return new npm_1.default(this.dependencies, this.path);
    }
    isYarn() {
        try {
            // user could have yarn installed, but not be using it
            // this will return false if the user isn't actually using yarn
            if (!process.env.npm_execpath ||
                process.env.npm_execpath.indexOf('yarn') === -1) {
                return false;
            }
            // test to be sure yarn can be spawned
            child_process_1.spawnSync('command -v yarn >/dev/null');
            return true;
        }
        catch (e) { }
        return false;
    }
}
exports.default = Dependencies;
//# sourceMappingURL=dependencies.js.map