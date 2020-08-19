import type { Bud } from './types';
import type { WebpackExternals } from '@roots/bud-typings';
declare type ExternalsBuilder = (bud: Bud) => WebpackExternals;
declare const externals: ExternalsBuilder;
export { externals };
export type { ExternalsBuilder };
//# sourceMappingURL=externals.d.ts.map