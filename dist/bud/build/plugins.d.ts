import type { Bud } from './types';
/**
 * Webpack plugins.
 */
declare const plugins: (bud: Bud) => {
    bud: Bud;
    pluginQueue: any;
    make: () => {
        plugins: any;
    };
    doHook: (name: any, ...params: any[]) => void;
};
export { plugins };
//# sourceMappingURL=plugins.d.ts.map