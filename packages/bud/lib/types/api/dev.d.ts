/// <reference types="webpack-dev-middleware" />
import type { Bud } from './types';
import { WebpackDevServer } from '@roots/bud-typings';
interface DevOptions extends WebpackDevServer {
    enabled: boolean;
    watch?: string[];
}
declare type Dev = (this: Bud, options: DevOptions) => Bud;
declare const dev: Dev;
export { dev, Dev };
//# sourceMappingURL=dev.d.ts.map