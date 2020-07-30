import type { Bud } from './types';
/**
 * Webpack plugins.
 */
declare const plugins: (bud: Bud) => {
    bud: Bud;
    adapters: import("../state/plugins/types").PluginsRepo;
    make: () => {
        plugins: any;
    };
    doHook: (name: any) => void;
};
export { plugins };
//# sourceMappingURL=plugins.d.ts.map