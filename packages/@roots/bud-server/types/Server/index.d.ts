/// <reference types="node" />
import { Server as Contract, Service } from '@roots/bud-framework';
import { FSWatcher } from 'fs-extra';
export declare class Server extends Service<Contract.Configuration> implements Contract {
    name: string;
    application: Contract.Application;
    config: Contract.Config;
    instance: Contract.Instance;
    middleware: Contract.Middleware.Inventory;
    _terminator: any;
    watcher: FSWatcher;
    readonly _assets: string[];
    get assets(): string[];
    get isWatchable(): boolean;
    getWatchedFilesArray(): string[];
    processMiddlewares(): void;
    run(): this;
    inject(): void;
    close(): void;
}
//# sourceMappingURL=index.d.ts.map