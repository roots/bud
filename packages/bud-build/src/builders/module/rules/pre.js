"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return this.hooks.filter(`webpack.module.rules.pre`, this.build.rules
        .getEntries()
        .filter(([, { enforce }]) => enforce == 'pre')
        .reduce((rules, [, rule]) => [...rules, rule], []));
}
exports.default = default_1;
//# sourceMappingURL=pre.js.map