import { Compiler } from 'webpack';
export interface DevFactoryOptions {
    compiler: Compiler;
    config: Framework.Server.Config;
}
declare const dev: ({ compiler, config, }: DevFactoryOptions) => any;
export { dev };
//# sourceMappingURL=dev.d.ts.map