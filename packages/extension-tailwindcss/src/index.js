"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boot = exports.api = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.api = __importStar(require("./api"));
const boot = (bud) => {
    !bud.build.items.get('postcss') &&
        (() => {
            Error([
                chalk_1.default.red.bold('\nDependencies missing\n'),
                chalk_1.default `{bold \`@roots/bud-postcss\` } can't be located.\n Please install the package. If you feel like it is installed you may want to consider running your package manager's install command again\n`,
            ].join('\n\n'));
        })();
    bud.build.items.mutate(`postcss.options.postcssOptions.plugins`, plugins => {
        var _a;
        return [
            ...plugins,
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('tailwindcss')((_a = bud.disk.get('project').get('tailwind.config.js')) !== null && _a !== void 0 ? _a : null),
        ];
    });
};
exports.boot = boot;
//# sourceMappingURL=index.js.map