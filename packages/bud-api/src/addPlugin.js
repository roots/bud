"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlugin = void 0;
const addPlugin = function (name, make) {
    this.extensions.set(name, { make });
    return this;
};
exports.addPlugin = addPlugin;
//# sourceMappingURL=addPlugin.js.map