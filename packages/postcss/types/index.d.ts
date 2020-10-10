import * as Framework from '@roots/bud-framework';
import * as postcss from './item';
/**
 * PostCSS Loader
 */
export declare const registerLoader: (bud: Framework.Bud) => void;
/**
 * PostCSS Loader implementation
 */
export declare const registerItem: (string | typeof postcss)[];
/**
 * On boot get the css rule and modify it to use postcss
 */
export declare const boot: (bud: Framework.Bud) => void;
//# sourceMappingURL=index.d.ts.map