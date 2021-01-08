"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeAppend = void 0;
const lodash_1 = require("lodash");
const lastChar = (str) => str.charAt(str.length - 1);
const maybeAppend = (str, char) => !lodash_1.isEqual(lastChar(str), char) ? lodash_1.join([str, char]) : str;
exports.maybeAppend = maybeAppend;
//# sourceMappingURL=maybeAppend.js.map