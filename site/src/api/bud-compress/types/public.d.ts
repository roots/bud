/**
 * Static asset compression extension
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import { Framework } from '@roots/bud-framework';

export declare const boot: (app: Framework) => any;

export declare namespace BudCompressionExtension {
    export interface Options {
        filename: string;
        algorithm: string;
        test: RegExp;
        compressionOptions: {
            [key: string]: any;
        };
        threshold: number;
        minRatio: number;
        deleteOriginalAssets: boolean;
    }
}

declare const name_2: "@roots/bud-compress";
export { name_2 as name }

export { }
