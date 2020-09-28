import { Compiler } from 'webpack';
import { ServerConfig } from '..';
export interface DevFactoryOptions {
    compiler: Compiler;
    config: ServerConfig;
}
declare const dev: ({ compiler, config, }: DevFactoryOptions) => any;
export { dev as default };
