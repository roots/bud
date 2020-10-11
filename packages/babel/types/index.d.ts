import * as Framework from '@roots/bud-framework';
import * as babel from './babel';
/**
 * Register babel loader
 */
export declare const registerLoader: string[];
/**
 * Register babel rules and config
 */
export declare const registerItems: {
    babel: typeof babel;
};
/**
 * Modify JS rules to use babel
 */
export declare const boot: (bud: Framework.Bud) => void;
//# sourceMappingURL=index.d.ts.map