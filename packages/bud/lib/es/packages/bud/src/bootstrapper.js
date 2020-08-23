/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
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
import { api } from './api/index.js';
import { compiler } from './compiler/index.js';
import { hooks } from './hooks/hooks.js';
import { logger } from './util/logger.js';
import { util } from './util/index.js';
import { extensionFactory } from './extensionFactory.js';
import { repositories } from './repositories/index.js';

/**
 * Bootstrapper
 */
var bootstrapper = function () {
    this.repositories = repositories;
    this.framework = {
        api: api,
        fs: util.fs,
        logger: logger,
        util: util,
        extensionFactory: extensionFactory,
    };
    this.apply = function (propertyName, propertyValue) {
        logger.info({ name: 'framework.apply' }, "bootstrapped: bud." + propertyName);
        this.framework[propertyName] = propertyValue;
        return this;
    };
    this.boot = function () {
        logger.info({ name: 'framework.boot', framework: this.framework }, "booting");
        this.framework.hooks = hooks(this.framework);
        this.framework.process = util.processHandler(this.framework);
        this.framework.compiler = compiler(this.framework);
        return this.framework;
    };
};
var bootstrap = new bootstrapper();

export { bootstrap };
