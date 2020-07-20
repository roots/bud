"use strict";
exports.__esModule = true;
exports.shortCircuit = void 0;
/**
 * JSON.stringify replacement function
 *
 * Prevents circular references in JSON from looping
 */
var shortCircuit = function () {
    // eslint-disable-next-line no-undef
    var seen = new WeakSet();
    return function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value) || key == 'UI') {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
exports.shortCircuit = shortCircuit;
