"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
const copy = function (from, options = {
    to: null,
    context: null,
    noErrorOnMissing: true,
    globOptions: {
        ignore: '.*',
    },
}) {
    this.extensions.mutate(`copy-webpack-plugin.patterns`, patterns => {
        var _a, _b, _c;
        return [
            ...patterns,
            {
                from,
                to: (_a = options.to) !== null && _a !== void 0 ? _a : this.dist(),
                context: (_b = options.context) !== null && _b !== void 0 ? _b : this.src(),
                globOptions: options.globOptions,
                noErrorOnMissing: (_c = options.noErrorOnMissing) !== null && _c !== void 0 ? _c : true,
            },
        ];
    });
    return this;
};
exports.copy = copy;
//# sourceMappingURL=copy.js.map