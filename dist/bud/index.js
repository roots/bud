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
    this.framework = {};
    this.repositories = repositories_1.repositories;
    this.logger = util_1.logger;
    this.store = container_1.bindContainer;
    this.fileStore = container_1.bindFileContainer;
    this.extensionStore = container_1.bindExtensionContainer;
    this.framework.logger = this.logger;
    this.framework.compiler = compiler_1.compiler;
    this.framework.util = util_1.util;
    this.framework.fs = util_1.util.fs;
    this.framework.flags = this.store(this.repositories.cli.flags, 'bud.flags');
    this.framework.paths = this.store(this.repositories.paths, 'bud.paths');
    this.framework.features = this.store(this.repositories.features, 'bud.features');
    this.framework.options = this.store(this.repositories.options, 'bud.options');
    this.framework.plugins = this.extensionStore(this.repositories.plugins, 'bud.plugins');
    this.framework.adapters = this.extensionStore(this.repositories.adapters, 'bud.adapters');
    this.framework.configs = this.fileStore(this.repositories.configs(this.framework), 'bud.configs');
    this.framework.env = this.store(this.repositories.env(this.framework), 'bud.env');
    this.framework.args = this.store(this.repositories.cli.args(this.framework), 'bud.args');
    this.framework.hooks = hooks_1.hooks(this.logger).init(this.framework);
    this.framework.mode = this.framework.args.get('mode');
    this.framework.inProduction = this.framework.args.is('mode', 'production');
    this.framework.inDevelopment = this.framework.args.is('mode', 'development');
    /**
     * Node process
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
     * Features and options.
     */
    this.framework.features.set('babel', this.framework.configs.has('babel'));
    this.framework.features.set('postCss', this.framework.configs.has('postCss'));
    this.framework.features.set('eslint', this.framework.configs.has('eslint'));
    this.framework.features.set('stylelint', this.framework.configs.has('stylelint'));
    this.framework.features.set('typescript', this.framework.configs.has('typescript'));
    this.framework.features.set('vue', this.framework.configs.has('vue'));
    this.framework.options.set('babel', options_1.babel(this.framework.configs));
    this.framework.options.set('postCss', options_1.postCss(this.framework.configs));
    this.framework.options.set('browserSync', options_1.browserSync(this.framework.flags));
    this.framework.options.set('typescript', options_1.typescript(this.framework.configs));
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map