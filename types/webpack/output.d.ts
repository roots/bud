/**
 * Webpack output.
 */
declare const output: (bud: any) => {
    bud: any;
    options: {
        output: {
            path: any;
            publicPath: any;
            filename: string;
        };
    };
    make: () => any;
    preHook: () => void;
    postHook: () => void;
};
export { output };
//# sourceMappingURL=output.d.ts.map