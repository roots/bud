import type { Bud } from './types';
/**
 * General webpack options
 *
 * @this {bud}
 */
declare const general: (bud: Bud) => {
    bud: Bud;
    options: {
        context: any;
        devtool: any;
        mode: any;
        target: any;
        watch: any;
    };
    make: () => any;
};
export { general };
//# sourceMappingURL=general.d.ts.map