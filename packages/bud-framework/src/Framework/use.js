"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
const bud_support_1 = require("@roots/bud-support");
const use = function (extensions) {
    if (bud_support_1.isString(extensions)) {
        this.extensions.use(extensions);
        return this;
    }
    const isArrayed = bud_support_1.isArray(extensions[0]);
    const isObjectDefinition = bud_support_1.isObject(extensions) && !bud_support_1.isArrayLike(extensions);
    if (isArrayed) {
        /**
         * Single import ['@roots/bud-sass]
         */
        const isSingleImport = bud_support_1.isEqual(extensions[0].length, 1) && // is only one item in array
            bud_support_1.isString(extensions[0]); // it is a string
        isSingleImport && this.extensions.use(extensions);
        /**
         * Multiple tuple [`personalPlugin`, {options: {meh}}]
         */
        const isMultiTuple = bud_support_1.isEqual(extensions[0].length, 2) && // has aname and a registrable
            bud_support_1.isString(extensions[0]); // is a string
        isMultiTuple &&
            extensions.forEach(module => {
                this.extensions.set(...module);
            });
        return this;
    }
    if (isObjectDefinition) {
        Object.entries(extensions).forEach(([name, ext]) => this.extensions.set(name, ext));
    }
    return this;
};
exports.use = use;
//# sourceMappingURL=use.js.map