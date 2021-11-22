/**
 * This package is a collection of internal dependencies utilized by the build system.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * This package is bundled with \@vercel/ncc. Sometimes type definitions can be a little iffy.
 *
 * It is recommended for extension authors to include their type definitions separately. You can
 * ensure that these packages are included in the runtime by specifying your type imports with
 * `import type` syntax.
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @core @packageDocumentation @betaDocumentation
 */

import * as chalk from 'chalk';
import * as cosmiconfig from 'cosmiconfig';
import cosmiconfigTsLoader from '@endemolshinegroup/cosmiconfig-typescript-loader';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { default as Express_2 } from 'express';
import { default as globby_2 } from 'globby';
import * as Ink from 'ink';
import InkGradient from 'ink-gradient';
import InkSpinner from 'ink-spinner';
import * as InkUseStyle from '@roots/ink-use-style';
import * as json5 from 'json5';
import * as Notifier from 'node-notifier';
import { OptionsReceived } from 'pretty-format';
import * as pkgUp from 'pkg-up';
import { stream } from 'globby';
import { sync } from 'globby';
import * as toml from 'toml';
import * as yaml from 'yamljs';

export { chalk }

export { cosmiconfig }

export { cosmiconfigTsLoader }

export { dotenv }

export { dotenvExpand }

declare type Dump = (obj: unknown, options?: OptionsReceived) => void;

export declare const dump: Dump;

export { Express_2 as Express }

declare namespace globby {
    export {
        globby_2 as globby,
        stream as globbyStream,
        sync as globbySync
    }
}
export { globby }

export { Ink }

export { InkGradient }

export { InkSpinner }

export { InkUseStyle }

/**
 * Is pkg string a wordpress window var match
 */
declare const isProvided: (pkg: string) => boolean;

export { json5 }

export declare const killPort: (port: number) => void;

export { Notifier }

declare type PkgName = WordPressScopePkg | 'lodash' | 'react' | 'react-dom' | 'jquery';

export { pkgUp }

declare namespace React_2 {
    export {

    }
}
export { React_2 as React }

export { toml }

/**
 * Transform pkg string request
 */
declare const transform: (pkg: PkgName) => {
    window: string;
    enqueue: string;
} | {
    window: string[];
    enqueue: string;
};

declare type WordPressScopePkg = `@wordpress/${string}`;

declare namespace wpPkgs {
    export {
        WordPressScopePkg,
        PkgName,
        isProvided,
        transform
    }
}
export { wpPkgs }

export { yaml }

export { }
