"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.when = exports.make = void 0;
const webpack_1 = require("webpack");
const make = options => new webpack_1.DefinePlugin(options.all());
exports.make = make;
const when = (_bud, opts) => { var _a; return ((_a = opts.getEntries()) === null || _a === void 0 ? void 0 : _a.length) > 0; };
exports.when = when;
const options = bud => bud.env
    .getEntries()
    .filter(([k]) => !k.includes('SECRET'))
    .reduce((a, [k, v]) => (Object.assign(Object.assign({}, a), { [k]: v })), {});
exports.options = options;
//# sourceMappingURL=define.js.map