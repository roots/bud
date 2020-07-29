"use strict";
exports.__esModule = true;
exports.inlineManifest = void 0;
var inlineManifest = function (name) {
    this.features.enable('inlineManifest');
    this.options.merge('inlineManifest', {
        name: name || 'runtime'
    });
    return this;
};
exports.inlineManifest = inlineManifest;
//# sourceMappingURL=inlineManifest.js.map