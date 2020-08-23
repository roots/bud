"use strict";
exports.__esModule = true;
exports.rules = void 0;
var rules = function (bud) {
    return bud.hooks.filter('webpack.module', {
        module: bud.hooks.filter('webpack.module.rules', {
            rules: bud.rules.repository.map(function (rule) {
                return bud.hooks.filter("webpack.module.rules." + rule.name, rule(bud));
            })
        })
    });
};
exports.rules = rules;
//# sourceMappingURL=rules.js.map