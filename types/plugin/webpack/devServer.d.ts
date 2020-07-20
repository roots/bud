/**
 * Dev server
 */
export function devServer(bud: any): {
    bud: any;
    options: {
        devServer: any;
    };
    make: () => {
        devServer: any;
    };
    preHook: () => void;
    postHook: () => void;
};
