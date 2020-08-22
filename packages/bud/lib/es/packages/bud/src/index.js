/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { __assign } from 'tslib';
import { api } from './api/index.js';
import { hooks } from './hooks/hooks.js';
import { logger } from './util/logger.js';
import { util } from './util/index.js';
import { repositories } from './repositories/index.js';
import { compiler } from './compiler/index.js';
import { bindContainer, bindFileContainer, bindExtensionContainer } from './container/index.js';

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
    this.framework = {
        apply: function (propertyName, propertyValue) {
            this[propertyName] = propertyValue;
        },
    };
    /**
     * Logger (pino)
     */
    this.logger = logger;
    this.log = function (message, data) {
        this.logger.info(__assign({ name: 'bootstrap' }, (data !== null && data !== void 0 ? data : [])), message);
    };
    /**
     * Containers
     */
    this.repositories = repositories;
    this.store = bindContainer;
    this.fileStore = bindFileContainer;
    this.extensionStore = bindExtensionContainer;
    /**
     * Utilities and dependencies.
     */
    this.framework.logger = this.logger;
    this.framework.util = util;
    this.framework.fs = util.fs;
    /**
     * Paths container.
     */
    this.framework.paths = this.store(this.repositories.paths, 'bud.paths');
    /**
     * Project configuration files container.
     */
    this.framework.configs = this.fileStore(this.repositories.configs(this.framework.paths), 'bud.configs');
    /**
     * Envvars container.
     */
    this.framework.env = this.store(this.repositories.env(this.framework.paths), 'bud.env');
    /**
     * Arguments container.
     */
    this.framework.args = this.store(this.repositories.cli.args(this.framework.env), 'bud.args');
    this.framework.mode = this.framework.args.get('mode');
    this.framework.inProduction = this.framework.args.is('mode', 'production');
    this.framework.inDevelopment = this.framework.args.is('mode', 'development');
    this.framework.flags = this.store(this.repositories.cli.flags, 'bud.flags');
    /**
     * Features container.
     */
    this.framework.features = this.store(this.repositories.features, 'bud.features');
    /**
     * Options container.
     */
    this.framework.options = this.store(this.repositories.options, 'bud.options');
    /**
     * Webpack module containers.
     */
    this.framework.patterns = this.store(this.repositories.patterns, 'bud.patterns');
    this.framework.loaders = this.store(this.repositories.loaders, 'bud.loaders');
    this.framework.rules = this.store(this.repositories.rules, 'bud.rules');
    this.framework.uses = this.store(this.repositories.uses, 'bud.uses');
    this.framework.adapters = this.extensionStore(this.repositories.adapters, 'bud.adapters');
    /**
     * Hooks API and store.
     */
    this.framework.hooks = hooks(this.logger).init(this.framework);
    /**
     * Compiler.
     */
    this.framework.compiler = compiler(this.framework);
    /**
     * Node process handling.
     */
    this.framework.process = util.processHandler(this.framework);
    /**
     * Options defaults that require construction.
     */
    this.framework.options.set('browserSync', this.framework.options.get('adapters.browsersync')(this.framework.flags));
    this.framework.options.set('babel', this.framework.options.get('babel')(this.framework.configs));
    this.framework.options.set('postcss', this.framework.options.get('postcss')(this.framework.flags));
    /**
     * API methods.
     */
    Object.values(api).forEach(function (method) {
        _this.framework[method.name] = method;
        _this.log("bootstrapped api method: bud." + method.name);
    });
};
/**
 * Bud Framework
 */
var bud = new bootstrap().framework;

export { bootstrap, bud };
