"use strict";
exports.__esModule = true;
exports.devtool = void 0;
var devtool = function (devtool) {
    this.logger.info({ name: 'bud.api', "function": 'bud.devtool', devtool: devtool }, "bud.devtool called");
    this.options.set('devtool', devtool);
    return this;
};
exports.devtool = devtool;
//# sourceMappingURL=devtool.js.map