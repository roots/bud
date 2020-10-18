import { Handler } from 'express';
export declare class Server {
    bud: Framework.Bud;
    instance: Framework.Server.Instance;
    config: Framework.Server.Config;
    middleware: any;
    constructor(bud: Framework.Bud);
    getInstance(): this['instance'];
    getConfig(): this['config'];
    setConfig(config: Framework.Server.Config): this;
    addMiddleware(middleware: Handler): this;
    addDevMiddleware(): this;
    addHotMiddleware(): this;
    addProxyMiddleware(): this;
    listen(): void;
}
//# sourceMappingURL=index.d.ts.map