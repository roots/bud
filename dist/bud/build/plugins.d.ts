import type { Bud } from './types';
/**
 * Webpack plugins.
 */
declare const plugins: (bud: Bud) => {
    bud: Bud;
    make: () => {
        plugins: any;
    };
    doHook: (name: any) => void;
};
export { plugins };
//# sourceMappingURL=plugins.d.ts.map