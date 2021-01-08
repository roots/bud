"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externals = void 0;
const externals = function () {
    return {
        externals: this.hooks.filter('webpack.externals', this.store.get('webpack.externals')),
    };
};
exports.externals = externals;
//# sourceMappingURL=externals.js.map