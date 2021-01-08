"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const bud_support_1 = require("@roots/bud-support");
const plugins = function () {
    const plugins = this.hooks.filter('webpack.plugins', this.extensions
        .getEntries()
        .map(([, extension]) => extension.isPlugin() ? extension.get('make') : null)
        .filter((maybePlugin) => !bud_support_1.isNull(maybePlugin)));
    return {
        plugins,
    };
};
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map