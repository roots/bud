"use strict";
exports.__esModule = true;
exports.bootstrap = void 0;
var api_1 = require("./api");
var hooks_1 = require("./hooks");
var util_1 = require("./util");
var purgeCss_1 = require("./util/purgeCss");
var repositories_1 = require("./repositories");
var options_1 = require("./repositories/options");
var compiler_1 = require("./compiler");
var container_1 = require("./container");
/**
 * Bud framework.
 *
 * @constructor
 */
var bootstrap = function () {
    var _this = this;
    /**
     * The framework container object.
     */
    this.framework = {};
    /**
     * Logger (pino)
     */
    this.logger = util_1.logger;
    /**
     * Containers
     */
    this.repositories = repositories_1.repositories;
    this.store = container_1.bindContainer;
    this.fileStore = container_1.bindFileContainer;
    this.extensionStore = container_1.bindExtensionContainer;
    /**
     * Utilities and dependencies.
     */
    this.framework.logger = this.logger;
    this.framework.util = util_1.util;
    this.framework.fs = util_1.util.fs;
    this.framework.services = { purgeCss: purgeCss_1.purgeCss };
    /**
     * CLI flags.
     */
    this.framework.flags = this.store(this.repositories.cli.flags, 'bud.flags');
    /**
     * Paths.
     */
    this.framework.paths = this.store(this.repositories.paths, 'bud.paths');
    /**
     * Features.
     */
    this.framework.features = this.store(this.repositories.features, 'bud.features');
    /**
     * Options.
     */
    this.framework.options = this.store(this.repositories.options, 'bud.options');
    /**
     * Presets.
     */
    this.framework.presets = this.store(this.repositories.presets, 'bud.presets');
    /**
     * Framework plugins.
     */
    this.framework.plugins = this.extensionStore(this.repositories.plugins, 'bud.plugins');
    /**
     * Webpack loaders.
     */
    this.framework.loaders = this.store(this.repositories.loaders, 'bud.loaders');
    /**
     * Webpack plugin adapters.
     */
    this.framework.adapters = this.extensionStore(this.repositories.adapters, 'bud.adapters');
    /**
     * Project configuration files.
     */
    this.framework.configs = this.fileStore(this.repositories.configs(this.framework), 'bud.configs');
    /**
     * Environmental variables
     */
    this.framework.env = this.store(this.repositories.env(this.framework), 'bud.env');
    /**
     * CLI arguments.
     */
    this.framework.args = this.store(this.repositories.cli.args(this.framework), 'bud.args');
    /**
     * Hooks API and store.
     */
    this.framework.hooks = hooks_1.hooks(this.logger).init(this.framework);
    /**
     * Compiler.
     */
    this.framework.compiler = compiler_1.compiler(this.framework);
    /**
     * Set mode.
     */
    this.framework.mode = this.framework.args.get('mode');
    this.framework.inProduction = this.framework.args.is('mode', 'production');
    this.framework.inDevelopment = this.framework.args.is('mode', 'development');
    /**
     * Node process handling.
     */
    this.framework.process = util_1.util.processHandler(this.framework);
    /**
     * API methods.
     */
    Object.values(api_1.api).forEach(function (method) {
        _this.framework[method.name] = method;
        _this.framework.logger.info({ name: 'bootstrap' }, "bootstrapped api method: bud." + method.name);
    });
    /**
     * Enable features based on presence of configuration files.
     */
    this.framework.features.set('babel', this.framework.configs.has('babel'));
    this.framework.features.set('postCss', this.framework.configs.has('postCss'));
    this.framework.features.set('eslint', this.framework.configs.has('eslint'));
    this.framework.features.set('stylelint', this.framework.configs.has('stylelint'));
    this.framework.features.set('typescript', this.framework.configs.has('typescript'));
    this.framework.features.set('vue', this.framework.configs.has('vue'));
    /**
     * Set options based based on presence of configuration files.
     */
    this.framework.options.set('babel', options_1.babel(this.framework.configs));
    this.framework.options.set('postCss', options_1.postCss(this.framework.configs));
    this.framework.options.set('browserSync', options_1.browserSync(this.framework.flags));
    this.framework.options.set('typescript', options_1.typescript(this.framework.configs));
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map