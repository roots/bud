"use strict";
exports.__esModule = true;
exports.except = void 0;
var lodash_1 = require("lodash");
var except = function (target, properties) {
    var freshObj = lodash_1.cloneDeep(target);
    properties.forEach(function (key) {
        delete freshObj[key];
    });
    return freshObj;
};
exports.except = except;
//# sourceMappingURL=except.js.map