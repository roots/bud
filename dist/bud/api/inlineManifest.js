"use strict";
exports.__esModule = true;
exports.inlineManifest = void 0;
var inlineManifest = function (name) {
    this.logger.info({ name: 'bud.api', "function": 'bud.inlineManifest', options: { name: name } }, "bud.inlineManifest called");
    this.features.enable('inlineManifest');
    var value = this.hooks.filter('api.inlineManifest.filter', {
        name: name || 'runtime'
    });
    this.options.set('inlineManifest', value);
    return this;
};
exports.inlineManifest = inlineManifest;
//# sourceMappingURL=inlineManifest.js.map