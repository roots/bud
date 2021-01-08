"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alias = void 0;
const alias = function (alias) {
    this.store.get('config').has('resolve.alias')
        ? this.store.mutate('webpack.resolve.alias', cfg => (Object.assign(Object.assign({}, cfg), alias)))
        : this.store.set('webpack.resolve.alias', alias);
    return this;
};
exports.alias = alias;
//# sourceMappingURL=alias.js.map