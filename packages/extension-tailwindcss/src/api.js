"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailwind = void 0;
const tailwind = function (params) {
    this.build.items.merge('postcss.options.postcssOptions.plugins', 
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    [require('tailwindcss')(params)]);
    return this;
};
exports.tailwind = tailwind;
//# sourceMappingURL=api.js.map