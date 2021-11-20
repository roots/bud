/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds Babel
 * transpilation to {@link @roots/bud-framework# | @roots/bud-framework}.

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import { Framework } from '@roots/bud-framework';

export declare const mixin: (app: any) => Promise<{
    babel: any[];
}>;

declare const name_2: string;
export { name_2 as name }

export declare const register: (app: Framework) => Promise<void>;

export { }
