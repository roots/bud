import type { Bud } from './types';
import type { WebpackConfig } from '@roots/bud-typings';
declare type WebpackBuilder = (bud: Bud) => WebpackConfig;
declare type WebpackReducer = (acc: any, curr: WebpackBuilder) => WebpackConfig;
declare const builders: import("./entry").EntryBuilder[];
declare const config: WebpackBuilder;
export { config, builders, WebpackBuilder, WebpackReducer, WebpackConfig, };
//# sourceMappingURL=index.d.ts.map