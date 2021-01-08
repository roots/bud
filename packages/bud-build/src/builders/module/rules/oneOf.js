"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneOf = void 0;
const reducer = function (rules, [label, rule]) {
    return [
        ...rules,
        this.hooks.filter(`webpack.module.rules.oneOf${label}`, rule),
    ];
};
/**
 * Filter and reduce rules into  webpack.oneOf array
 */
const oneOf = function () {
    return this.build.rules
        .getEntries()
        .filter(([, { enforce }]) => enforce !== 'pre')
        .reduce(reducer.bind(this), [])
        .filter(Boolean);
};
exports.oneOf = oneOf;
//# sourceMappingURL=oneOf.js.map