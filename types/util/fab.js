"use strict";
exports.__esModule = true;
exports.fab = void 0;
/**
 * Fabs: like noop but fab.
 */
var fab = {
    "false": function () { return false; },
    "true": function () { return true; },
    undefined: function () { return undefined; },
    "null": function () { return null; }
};
exports.fab = fab;
