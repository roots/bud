/**
 * Externals
 */
export type externals = (arg0: any, arg1: any) => object;
/**
 * Externals
 *
 * @typedef {function(bud: bud): object} externals
 */
export function externals(bud: any): {
    bud: any;
    options: {
        externals: any;
    };
    make: () => {
        externals: any;
    };
    pre: () => void;
    post: () => void;
};
