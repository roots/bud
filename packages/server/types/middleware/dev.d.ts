import { Compiler } from 'webpack';
import { Server } from '../Server';
export interface DevFactoryOptions {
    compiler: Compiler;
    config: Server.Config;
}
declare const dev: ({ compiler, config, }: DevFactoryOptions) => any;
export { dev as default };
//# sourceMappingURL=dev.d.ts.map