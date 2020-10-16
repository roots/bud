import { Handler, Application as Express } from 'express';
import { Compiler } from 'webpack';
export declare class Server {
    instance: Server.Instance;
    config: Server.Config;
    compiler: Compiler;
    constructor();
    getServer(): this['instance'];
    setServer(instance: Express): this;
    getConfig(): this['config'];
    setConfig(config: Server.Config): this;
    getCompiler(): Compiler;
    setCompiler(compiler: Compiler): this;
    addMiddleware(middleware: Handler): this;
    addDevMiddleware(): this;
    addHotMiddleware(): this;
    addProxyMiddleware(): this;
    listen(): void;
}
//# sourceMappingURL=index.d.ts.map