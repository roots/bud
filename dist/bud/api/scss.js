"use strict";
exports.__esModule = true;
exports.scss = void 0;
var scss = function (enabled, options) {
    this.logger.info({ name: 'bud.api', "function": 'bud.scss', enabled: enabled }, "bud.scss called");
    this.features.set('scss', this.hooks.filter('filter_scss_enabled', enabled ? enabled : true));
    if (options) {
        this.options.merge('scss', options);
    }
    return this;
};
exports.scss = scss;
//# sourceMappingURL=scss.js.map