/**
 * The {@link @roots/bud-babel# | @roots/bud-babel extension} adds Babel
 * transpilation to {@link @roots/bud-framework# | @roots/bud-framework}.

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import { Framework } from '@roots/bud-framework';

/**
 * Exposes app.babel configuration utility
 *
 * @public
 */
export declare const mixin: (app: any) => Promise<{
    babel: any[];
}>;

/**
 * Adds Babel transpiler support to Framework projects
 *
 * @public
 */
declare const name_2 = "@roots/bud-babel";
export { name_2 as name }

/**
 * Extension register event
 *
 * @public
 */
export declare const register: (app: Framework) => Promise<void>;

export { }
