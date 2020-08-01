"use strict";
exports.__esModule = true;
exports.bootstrap = void 0;
var api_1 = require("./api");
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var repositories_1 = require("./repositories");
var options_1 = require("./repositories/options");
var compiler_1 = require("./compiler");
var container_1 = require("./container");
/**
 * Bud framework.
 * @constructor
 */
var bootstrap = function () {
    var _this = this;
    /**
     * Bootstrap target.
     */
    this.framework = {};
    /**
     * Utilities.
     */
    this.framework.util = util_1.util;
    this.framework.fs = util_1.util.fs;
    /**
     * Binders.
     */
    this.store = container_1.bindContainer;
    this.fileStore = container_1.bindFileContainer;
    this.extensionStore = container_1.bindExtensionContainer;
    /**
     * Stores.
     */
    this.repositories = repositories_1.repositories;
    /**
     * Compiler.
     */
    this.framework.compiler = compiler_1.compiler;
    /**
     * Hooks.
     */
    this.framework.hooks = hooks_1.hooks().init(this.framework);
    /**
     * API.
     */
    Object.values(api_1.api).forEach(function (method) {
        _this.framework[method.name] = method;
    });
    /**
     * Base stores.
     */
    this.framework.paths = this.store(this.repositories.paths);
    this.framework.features = this.store(this.repositories.features);
    this.framework.options = this.store(this.repositories.options);
    /**
     * Derived stores.
     */
    this.framework.configs = this.fileStore(this.repositories.configs(this.framework));
    this.framework.env = this.store(this.repositories.env(this.framework));
    this.framework.flags = this.store(this.repositories.flags(this.framework));
    /**
     * Extensions.
     */
    this.framework.plugins = this.extensionStore(this.repositories.plugins);
    this.framework.adapters = this.extensionStore(this.repositories.adapters);
    /**
     * Auto-configured features.
     */
    this.framework.features.set('babel', this.framework.configs.has('babel'));
    this.framework.features.set('postCss', this.framework.configs.has('postCss'));
    this.framework.features.set('eslint', this.framework.configs.has('eslint'));
    this.framework.features.set('stylelint', this.framework.configs.has('stylelint'));
    this.framework.features.set('typescript', this.framework.configs.has('typescript'));
    this.framework.features.set('vue', this.framework.configs.has('vue'));
    /**
     * Auto-configured options.
     */
    this.framework.options.set('babel', options_1.babel(this.framework.configs));
    this.framework.options.set('postCss', options_1.postCss(this.framework.configs));
    this.framework.options.set('browserSync', options_1.browserSync(this.framework.flags));
    this.framework.options.set('typescript', options_1.typescript(this.framework.configs));
    /**
     * Accessors.
     */
    this.framework.mode = this.framework.flags.get('mode');
    this.framework.inProduction = this.framework.flags.is('mode', 'production');
    this.framework.inDevelopment = this.framework.flags.is('mode', 'development');
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map