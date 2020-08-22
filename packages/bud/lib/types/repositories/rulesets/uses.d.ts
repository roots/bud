import { Bud } from '../..';
import type { WebpackRule } from '@roots/bud-typings';
/**
 * Module Rule
 */
declare type Use = (bud: Bud) => WebpackRule;
declare const uses: {
    repository: string;
    contents: {
        babel: (bud: Bud) => any;
        file: (bud: Bud) => {
            loader: any;
            options: {
                name: string;
            };
        };
        miniCss: (bud: Bud) => any;
        css: (bud: Bud) => any;
        resolveUrl: (bud: Bud) => any;
        postCss: (bud: Bud) => any;
        style: (bud: Bud) => any;
    };
};
export { uses };
export { Use };
//# sourceMappingURL=uses.d.ts.map