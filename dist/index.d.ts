/// <reference types="webpack-dev-server" />
import type { Configuration } from 'webpack';
export * from './bud/api/types';
export { Hooks } from './bud/hooks/types';
export { State } from './bud/state/types';
export { Util } from './bud/util/types';
export declare type Mode = Configuration['mode'];
export declare type Production = boolean;
/**
 * ## Bud - asset management framework.
 *
 * @const {Bud} bud
 */
export { bud } from './bud';
//# sourceMappingURL=index.d.ts.map