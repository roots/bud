/**
 * Hook: useWebpack
 *
 * @prop {Bud} bud
 */
declare const useWebpack: (bud: any) => {
    assets: any[];
    hasAssets: boolean;
    errors: any[];
    hasErrors: boolean;
    hash: any;
    hasHash: boolean;
    time: any;
    hasTime: boolean;
    warnings: any[];
    hasWarnings: boolean;
    percentage: number;
    done: boolean;
    success: boolean;
    message: string;
    hotSyncServer: any;
};
export { useWebpack };
//# sourceMappingURL=useWebpack.d.ts.map