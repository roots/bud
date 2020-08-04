"use strict";
exports.__esModule = true;
exports.useVueStyle = void 0;
var useVueStyle = function (rule, bud) {
    var loader = bud.loaders.get('vueStyle');
    bud.logger.info({ name: rule, loader: loader }, "using vue-style-loader");
    return { loader: loader };
};
exports.useVueStyle = useVueStyle;
//# sourceMappingURL=useVueStyle.js.map