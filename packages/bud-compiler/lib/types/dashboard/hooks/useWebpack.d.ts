import { Bud } from '@roots/bud';
/**
 * Hook: useWebpack
 *
 * @prop {Bud} bud
 */
declare const useWebpack: (bud: Bud) => {
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
    server: any;
    done: boolean;
    success: boolean;
    message: string;
};
export { useWebpack };
//# sourceMappingURL=useWebpack.d.ts.map