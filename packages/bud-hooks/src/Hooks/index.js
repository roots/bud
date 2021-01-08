"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hooks = void 0;
const Service_1 = __importDefault(require("./Service"));
/**
 * Hooks
 */
class Hooks extends Service_1.default {
    on(name, filter) {
        this.filters.set(name, filter);
    }
    when(name, action) {
        this.actions.set(name, action);
    }
    action(name, binding) {
        this.actions.has(name) &&
            this.actions.get(name).map(action => action.bind(binding));
    }
    filter(name, value) {
        return this.filters.has(name) && this.filters.isArray(name)
            ? this.filters.get(name).reduce((v, f) => f(v), [])
            : value;
    }
}
exports.Hooks = Hooks;
//# sourceMappingURL=index.js.map