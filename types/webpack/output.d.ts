/**
 * Webpack output.
 */
export function output(bud: any): {
    bud: any;
    options: {
        output: {
            path: any;
            publicPath: any;
            filename: string;
        };
    };
    make: () => {
        output: {
            path: any;
            publicPath: any;
            filename: string;
        };
    };
    preHook: () => void;
    postHook: () => void;
};
