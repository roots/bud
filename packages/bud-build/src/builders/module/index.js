"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleBuilder = void 0;
const rules_1 = require("./rules");
const moduleBuilder = function () {
    return {
        module: this.hooks.filter('webpack.module', Object.assign(Object.assign(Object.assign({}, this.store.get('webpack.module')), rules_1.rules.bind(this)()), { noParse: this.hooks.filter('webpack.module.noParse', this.store.get('webpack.module.noParse')) })),
    };
};
exports.moduleBuilder = moduleBuilder;
//# sourceMappingURL=index.js.map