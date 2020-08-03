"use strict";
exports.__esModule = true;
exports.useStyle = void 0;
var useStyle = function (rule, bud) {
    var loader = bud.loaders.get('style');
    bud.logger.info({ name: rule, loader: loader }, "using style-loader");
    return { loader: loader };
};
exports.useStyle = useStyle;
//# sourceMappingURL=useStyle.js.map