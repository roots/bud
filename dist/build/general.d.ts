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
        mode: "development" | "production" | "none";
        node: any;
        target: "web" | "webworker" | "node" | "async-node" | "node-webkit" | "atom" | "electron" | "electron-renderer" | "electron-preload" | "electron-main" | ((compiler?: any) => void);
        watch: boolean;
    };
    make: () => any;
};
export { general };
//# sourceMappingURL=general.d.ts.map