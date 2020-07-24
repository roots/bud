/**
 * PostCSS
 * @typedef {function} postCss
 * @return {object}
 */
declare const postCss: (bud: any) => {
    bud: any;
    config: {
        loader: string;
        options: any;
    };
    output: {};
    make: () => any;
};
export { postCss };
//# sourceMappingURL=postCss.d.ts.map