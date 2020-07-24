/// <reference types="webpack" />
import type { Bud } from './types';
declare const externals: (bud: Bud) => {
    bud: Bud;
    options: {
        externals: string | RegExp | import("webpack").ExternalsObjectElement | import("webpack").ExternalsFunctionElement | import("webpack").ExternalsElement[];
    };
    make: () => any;
};
export { externals };
//# sourceMappingURL=externals.d.ts.map