/// <reference types="webpack-dev-server" />
import type { Bud } from './types';
import { WebpackDevServer } from '@roots/bud-typings';
interface DevOptions extends WebpackDevServer {
    enabled: boolean;
    defaults: boolean;
    watch: string[];
    chokidar: {
        (app: any, server: any): any;
    };
}
declare type Dev = (this: Bud, options: DevOptions) => Bud;
declare const dev: Dev;
export { dev, Dev };
//# sourceMappingURL=dev.d.ts.map