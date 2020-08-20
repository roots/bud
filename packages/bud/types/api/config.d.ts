/// <reference types="webpack" />
/// <reference types="webpack-dev-server" />
import type { Bud, WebpackConfiguration } from './types';
declare type Config = (this: Bud) => WebpackConfiguration;
declare const config: Config;
export { config };
export type { Config };
//# sourceMappingURL=config.d.ts.map