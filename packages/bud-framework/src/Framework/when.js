"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = void 0;
const bud_support_1 = require("@roots/bud-support");
const when = function (test, isTrue, isFalse) {
    bud_support_1.isEqual(test, true)
        ? bud_support_1.isFunction(isTrue) && isTrue(this)
        : bud_support_1.isFunction(isFalse) && isFalse(this);
    return this;
};
exports.when = when;
//# sourceMappingURL=when.js.map