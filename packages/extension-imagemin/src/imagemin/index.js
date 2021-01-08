"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const image_minimizer_webpack_plugin_1 = __importDefault(require("image-minimizer-webpack-plugin"));
exports.options = {
    minimizerOptions: {
        plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 7 }],
            [
                'svgo',
                {
                    plugins: [
                        {
                            removeViewBox: false,
                        },
                    ],
                },
            ],
        ],
    },
};
const make = options => new image_minimizer_webpack_plugin_1.default(options.all());
exports.make = make;
const when = ({ mode }) => mode.is('development');
exports.when = when;
//# sourceMappingURL=index.js.map