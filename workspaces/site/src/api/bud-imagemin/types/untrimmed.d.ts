/**
 * Add image optimization support to Bud projects
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import { Container } from '@roots/container';
import { Extension } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { SquooshOptions } from 'image-minimizer-webpack-plugin';

/**
 * Extension api
 *
 * @public
 */
export declare const api: {
    imagemin: imagemin;
};

declare const api_2: {
    imagemin: imagemin;
};

/**
 * Extension boot
 *
 * @public
 */
export declare const boot: Extension.Module['boot'];

declare const boot_2: (app: Framework) => Promise<void>;

declare namespace BudImagemin {
    export {
        name_3 as name,
        options_2 as options,
        api_2 as api,
        boot_2 as boot
    }
}

declare interface imagemin {
    (callback: (options: Container) => typeof BudImagemin.options): Framework;
}

declare interface imagemin {
    (setting: 'lossless' | 'lossy'): Framework;
}

declare const imagemin: imagemin;

/**
 * Extension name
 *
 * @public
 */
declare const name_2: Extension.Module['name'];
export { name_2 as name }

declare const name_3: Extension.Module['name'];

/**
 * Extension options
 *
 * @public
 */
export declare const options: Extension.Module['options'];

declare const options_2: Extension.Module['options'] | SquooshOptions;

export { }
