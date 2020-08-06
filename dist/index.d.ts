/// <reference types="webpack-dev-server" />
import type { Configuration } from 'webpack';
import { Bud } from './bud/types';
export * from './bud/api/types';
export type { Hooks } from './bud/hooks/types';
export type { State } from './bud/repositories/types';
export type { Util } from './bud/util/types';
export declare type Mode = Configuration['mode'];
export declare type Production = boolean;
declare const bud: Bud;
import { palettePlugin } from './extensions/roots-palette-plugin';
import { tailwind } from './extensions/tailwind';
export { bud, palettePlugin, tailwind, };
//# sourceMappingURL=index.d.ts.map