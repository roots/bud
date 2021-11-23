/**
 * Adds terser minification support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @packageDocumentation
 */

import { Framework } from '@roots/bud-framework';
import { TerserOptions } from 'terser-webpack-plugin/types';
import TerserPlugin from 'terser-webpack-plugin/types';

declare namespace api {
    export {
        terser
    }
}
export { api }

export declare const boot: ({ extensions, hooks, store }: {
    extensions: any;
    hooks: any;
    store: any;
}) => void;

declare const name_2 = "@roots/bud-terser";
export { name_2 as name }

export declare const options: (app: Framework) => {
    parallel: any;
    include: any;
    extractComments: boolean;
    terserOptions: {
        parse: {
            ecma: number;
        };
        compress: boolean;
        mangle: {
            safari10: boolean;
        };
        output: {
            ecma: number;
            comments: boolean;
            ascii_only: boolean;
        };
    };
};

declare namespace Terser {
    type Options = TerserOptions;
    type Plugin = TerserPlugin;
}

declare interface terser {
    (this: Framework, options: Terser.Options): Framework;
}

declare const terser: terser;

export { }
