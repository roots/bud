"use strict";
exports.__esModule = true;
exports.bootstrap = void 0;
var api_1 = require("./api");
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var state_1 = require("./state");
var plugins_1 = require("./state/plugins");
var options_1 = require("./state/options");
var compiler_1 = require("./compiler");
var container_1 = require("./container");
/**
 * Bud framework.
 */
var bootstrap = function () {
    var _this = this;
    /** Bootstrap target */
    this.framework = {};
    /**
     * Binders
     */
    this.store = container_1.bindContainer;
    this.fileStore = container_1.bindFileContainer;
    this.extensionStore = container_1.bindExtensionContainer;
    /**
     * Util
     */
    this.framework.util = util_1.util;
    this.framework.fs = util_1.util.fs;
    this.framework.compiler = compiler_1.compiler;
    /**
     * Hooks
     */
    this.framework.hooks = hooks_1.hooks();
    /**
     * API methods
     */
    Object.values(api_1.api).forEach(function (method) {
        _this.framework[method.name] = method;
    });
    /**
     * Simple stores.
     */
    this.framework.paths = this.store(state_1.pathsRepository);
    this.framework.features = this.store(state_1.featuresRepository);
    this.framework.options = this.store(options_1.optionsRepository);
    /**
     * Derived stores.
     */
    this.framework.configs = this.fileStore(state_1.configsRepository(this.framework));
    this.framework.env = this.store(state_1.envRepository(this.framework));
    this.framework.flags = this.store(state_1.flagsRepository(this.framework));
    /**
     * Extensions
     */
    this.framework.plugins = this.extensionStore(plugins_1.pluginsRepository);
    this.framework.adapters = this.extensionStore(plugins_1.adaptersRepository);
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
     * Simple accessors.
     */
    this.framework.mode = this.framework.flags.get('mode');
    this.framework.inProduction = this.framework.flags.is('mode', 'production');
    this.framework.inDevelopment = this.framework.flags.is('mode', 'development');
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map