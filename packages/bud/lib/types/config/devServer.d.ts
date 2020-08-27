/// <reference types="webpack-dev-server" />
import type { Bud } from './types';
import type { WebpackDevServer } from '@roots/bud-typings';
declare type DevServerBuilder = (bud: Bud) => WebpackDevServer;
declare const devServer: DevServerBuilder;
export { devServer };
export type { DevServerBuilder };
//# sourceMappingURL=devServer.d.ts.map