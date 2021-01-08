"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = void 0;
const webpack_1 = require("webpack");
const make = options => new webpack_1.ProvidePlugin(options.all());
exports.make = make;
const when = (_bud, options) => options.getKeys().length > 0;
exports.when = when;
//# sourceMappingURL=provide.js.map