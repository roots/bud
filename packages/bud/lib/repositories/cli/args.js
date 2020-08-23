"use strict";
var _a, _b, _c, _d, _e, _f, _g;
exports.__esModule = true;
exports.args = void 0;
var yargs_1 = require("yargs");
var args = {
    name: 'args',
    register: {
        mode: (_a = yargs_1.argv['env']) !== null && _a !== void 0 ? _a : 'none',
        host: (_b = yargs_1.argv['host']) !== null && _b !== void 0 ? _b : false,
        port: (_c = yargs_1.argv['port']) !== null && _c !== void 0 ? _c : null,
        proxy: (_d = yargs_1.argv['proxy']) !== null && _d !== void 0 ? _d : null,
        src: (_e = yargs_1.argv['src']) !== null && _e !== void 0 ? _e : null,
        dist: (_f = yargs_1.argv['dist']) !== null && _f !== void 0 ? _f : null,
        feature: (_g = yargs_1.argv['feature']) !== null && _g !== void 0 ? _g : null
    }
};
exports.args = args;
//# sourceMappingURL=args.js.map