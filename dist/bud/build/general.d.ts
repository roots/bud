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
        target: any;
        watch: boolean;
    };
    make: () => any;
};
export { general };
//# sourceMappingURL=general.d.ts.map