/// <reference types="webpack" />
import type { Bud } from '../types';
declare const babel: (bud: Bud) => {
    test: any;
    exclude: any;
    use: import("webpack").RuleSetRule[];
};
export { babel };
//# sourceMappingURL=babel.d.ts.map