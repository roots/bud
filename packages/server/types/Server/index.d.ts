import { Handler } from 'express';
export declare class Server {
    bud: Framework.Bud;
    instance: Server.Instance;
    config: Server.Config;
    middleware: any;
    constructor(bud: Framework.Bud);
    getServer(): this['instance'];
    getConfig(): this['config'];
    setConfig(config: Server.Config): this;
    addMiddleware(middleware: Handler): this;
    addDevMiddleware(): this;
    addHotMiddleware(): this;
    addProxyMiddleware(): this;
    listen(): void;
}
//# sourceMappingURL=index.d.ts.map