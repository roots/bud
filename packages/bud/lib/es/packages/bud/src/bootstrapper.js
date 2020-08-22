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

/**
 * Bootstrapper
 */
var bootstrapper = function () {
    this.framework = {
        api: api,
        extensionFactory: extensionFactory,
        fs: util.fs,
        logger: logger,
        util: util,
    };
    this.apply = function (propertyName, propertyValue) {
        this.framework[propertyName] = propertyValue;
        this.framework.logger.info({ name: 'framework.apply' }, "bootstrapped: bud." + propertyName);
        return this;
    };
    this.boot = function () {
        this.framework.logger.info({ name: 'framework.boot', framework: this.framework }, "booting");
        this.apply('hooks', hooks(this.framework))
            .apply('process', util.processHandler(this.framework))
            .apply('compiler', compiler(this.framework));
        return this.framework;
    };
};
var bootstrap = new bootstrapper();

export { bootstrap };
