/**
 * Externals
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
