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
import { makeExtensionContainer, makeContainer, makeFileContainer } from './container.js';
import { repositories } from './repositories/index.js';

repositories.extensions.forEach(function (ext) {
    bootstrap.apply(ext.repository, makeExtensionContainer(ext, bootstrap.framework));
});
repositories.stores.forEach(function (store) {
    bootstrap.apply(store.repository, makeContainer(store, bootstrap.framework));
});
repositories.files.forEach(function (file) {
    bootstrap.apply(file.repository, makeFileContainer(file, bootstrap.framework));
});
bootstrap.apply('mode', bootstrap.framework.args.get('mode'));
bootstrap.apply('inProduction', bootstrap.framework.args.is('mode', 'production'));
bootstrap.apply('inDevelopment', bootstrap.framework.args.is('mode', 'development'));
Object.values(api).forEach(function (method) {
    bootstrap.apply(method.name, method);
});
var bud = bootstrap.boot();
bud.options.set('browserSync', bud.options.get('adapters.browsersync')(bud.flags));
bud.options.set('babel', bud.options.get('babel')(bud.configs));
bud.options.set('postcss', bud.options.get('postcss')(bud.flags));

export { bud };
