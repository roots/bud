"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return this.hooks.filter(`webpack.module.rules.post`, this.build.rules
        .getEntries()
        .filter(([, { enforce }]) => enforce == 'post')
        .reduce((rules, [, rule]) => [...rules, rule], []));
}
exports.default = default_1;
//# sourceMappingURL=post.js.map