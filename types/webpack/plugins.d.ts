/**
 * Webpack plugins.
 */
declare const plugins: (bud: Bud) => {
    bud: Bud;
    pluginQueue: import("../bud/plugin").WebpackAdapters;
    make: () => {
        plugins: any;
    };
};
export { plugins };
import type { Bud } from '../bud';
//# sourceMappingURL=plugins.d.ts.map