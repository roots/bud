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
import { bootstrap } from './bootstrapper.js';
export { bootstrap } from './bootstrapper.js';
import { registerExtensionContainer, registerFileContainer, registerContainer } from './container.js';

bootstrap.repositories.extensions.forEach(function (store) {
    bootstrap.framework[store.name] = registerExtensionContainer(store);
});
bootstrap.repositories.files.forEach(function (store) {
    bootstrap.framework[store.name] = registerFileContainer(store);
});
bootstrap.repositories.stores.forEach(function (store) {
    bootstrap.framework[store.name] = registerContainer(store);
});
bootstrap.framework.mode = bootstrap.framework.args.get('mode');
bootstrap.framework.inProduction = bootstrap.framework.args.is('mode', 'production');
bootstrap.framework.inDevelopment = bootstrap.framework.args.is('mode', 'development');
Object.values(api).forEach(function (method) {
    bootstrap.framework[method.name] = method;
});
var bud = bootstrap.boot();
bud.options.set('webpack.plugins.browsersync', bud.options.get('webpack.plugins.browsersync')(bud.flags));
bud.options.set('babel', bud.options.get('babel')(bud.configs));
bud.options.set('postcss', bud.options.get('postcss')(bud.flags));
bud.apply = function (propertyName, propertyValue) {
    bud[propertyName] = propertyValue;
    return this;
};

export { bud };
