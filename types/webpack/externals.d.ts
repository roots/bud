/// <reference types="webpack" />
/**
 * Externals
 */
declare const externals: (bud: Bud) => {
    bud: Bud;
    options: {
        externals: string | RegExp | import("webpack").ExternalsObjectElement | import("webpack").ExternalsFunctionElement | import("webpack").ExternalsElement[];
    };
    make: () => any;
};
export { externals };
import type { Bud } from '../bud';
//# sourceMappingURL=externals.d.ts.map