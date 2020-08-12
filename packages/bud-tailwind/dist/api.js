"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tailwindcss_1 = __importDefault(require("tailwindcss"));
/**
 * ## bud.tailwind
 *
 * Configure tailwindcss support
 *
 * ```js
 * bud.tailwind({config: bud.project('custom-tailwind.js')})
 * ```
 *
 * ```js
 * bud.tailwind(({theme}) => ({
 *  colors: {},
 *  // ...
 * }))
 * ```
 */
const configTailwind = function (config) {
    this.options.set('postCss', {
        ...this.options.postCss,
        plugins: [...this.options.get('postCss').plugins, tailwindcss_1.default(config)],
    });
    return this;
};
exports.default = configTailwind;
//# sourceMappingURL=api.js.map