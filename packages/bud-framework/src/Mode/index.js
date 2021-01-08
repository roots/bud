"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("./Service"));
class default_1 extends Service_1.default {
    /**
     * Service registration
     */
    register() {
        //
    }
    /**
     * Service boot
     */
    boot() {
        //
    }
    /**
     * Get mode
     */
    get() {
        return this.app.store.get('args.mode');
    }
    /**
     * Set mode
     */
    set(mode) {
        this.app.store.set('args.mode', mode);
    }
    /**
     * Conditional check
     */
    is(check) {
        return this.app.store.is('args.mode', check);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map