import { Webpack, Server } from '@roots/bud-support';
export interface DevFactoryOptions {
    compiler: Webpack.Compiler;
    config: Server['config'];
}
/**
 * Make dev middleware
 */
declare const dev: ({ compiler, config, }: DevFactoryOptions) => any;
export { dev };
//# sourceMappingURL=dev.d.ts.map