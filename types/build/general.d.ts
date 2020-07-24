import type { Bud } from './types';
/**
 * General webpack options
 *
 * @this {bud}
 */
declare const general: (bud: Bud) => {
    bud: Bud;
    options: {
        context: string;
        devtool: any;
        mode: "none" | "development" | "production";
        node: {
            module: string;
            dgram: string;
            dns: string;
            fs: string;
            http2: string;
            net: string;
            tls: string;
            child_process: string;
        };
        target: "node" | "web" | "webworker" | "async-node" | "node-webkit" | "atom" | "electron" | "electron-renderer" | "electron-preload" | "electron-main" | ((compiler?: any) => void);
        watch: boolean;
    };
    make: () => any;
};
export { general };
//# sourceMappingURL=general.d.ts.map