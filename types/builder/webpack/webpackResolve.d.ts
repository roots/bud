/**
 * Webpack resolvers.
 *
 * @param {object}
 */
export function webpackResolve(bud: any): {
    bud: any;
    options: {
        resolve: {
            extensions: string[];
            modules: any[];
            alias: any;
        };
    };
    make: () => {
        resolve: {
            extensions: string[];
            modules: any[];
            alias: any;
        };
    };
    preHook: () => void;
    postHook: () => void;
};
