"use strict";
exports.__esModule = true;
exports.bud = void 0;
var api_1 = require("./api");
var compiler_1 = require("./compiler");
var bud_framework_1 = require("@roots/bud-framework");
var repositories_1 = require("./repositories");
repositories_1.repositories.extensions.forEach(function (store) {
    bud_framework_1.framework.bindExtensions(store.name, store);
});
repositories_1.repositories.files.forEach(function (store) {
    bud_framework_1.framework.bindFiles(store.name, store);
});
repositories_1.repositories.stores.forEach(function (store) {
    bud_framework_1.framework.bind(store.name, store);
});
bud_framework_1.framework.apply('mode', bud_framework_1.framework.args.get('mode'));
bud_framework_1.framework.apply('inProduction', bud_framework_1.framework.args.is('mode', 'production'));
bud_framework_1.framework.apply('inDevelopment', bud_framework_1.framework.args.is('mode', 'development'));
bud_framework_1.framework.options.set('webpack.plugins.browsersync', bud_framework_1.framework.options.get('webpack.plugins.browsersync')(bud_framework_1.framework.flags));
var babel = bud_framework_1.framework.options.get('babel');
bud_framework_1.framework.options.set('babel', babel(bud_framework_1.framework.configs));
var postcss = bud_framework_1.framework.options.get('postcss');
bud_framework_1.framework.options.set('postcss', postcss(bud_framework_1.framework.flags));
bud_framework_1.framework.apply('fs', bud_framework_1.framework.util.fs);
Object.values(api_1.api).forEach(function (method) {
    bud_framework_1.framework.apply(method.name, method);
});
bud_framework_1.framework.apply('compiler', compiler_1.compiler(bud_framework_1.framework));
bud_framework_1.framework.apply('hooks', bud_framework_1.framework.hooks(bud_framework_1.framework));
var bud = bud_framework_1.framework;
exports.bud = bud;
//# sourceMappingURL=index.js.map