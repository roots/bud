/**
 * Webpack plugins.
 */
declare const plugins: (bud: Bud) => {
    bud: Bud;
    pluginQueue: import("../bud/plugin").WebpackAdapters;
    make: () => {
        plugins: any;
    };
    doHook: (name: any) => void;
};
export { plugins };
import type { Bud } from '../bud';
//# sourceMappingURL=plugins.d.ts.map