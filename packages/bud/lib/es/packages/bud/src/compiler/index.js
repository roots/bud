/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
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
import { build } from './webpack/index.js';
import { renderCompilerDashboard } from './renderCompilerDashboard.js';

var compiler = function (bud) { return ({
    bud: bud,
    dashboardEnabled: function () {
        return this.bud.features.enabled('dashboard');
    },
    buildConfig: function () {
        this.config = build(this.bud);
        return this;
    },
    compile: function () {
        renderCompilerDashboard(this.bud, this.config);
    },
}); };

export { compiler };
