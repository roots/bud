"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entry = void 0;
const entry = function () {
    return {
        entry: this.hooks.filter('webpack.entry', this.store.get('webpack.entry')),
    };
};
exports.entry = entry;
//# sourceMappingURL=entry.js.map