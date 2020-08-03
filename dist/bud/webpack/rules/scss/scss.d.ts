/**
 * scss
 */
declare const scss: (bud: any) => {
    bud: any;
    name: string;
    isHot: any;
    isPostCss: any;
    rule: {
        test: RegExp;
        use: any[];
        sourceMap: any;
    };
    make: () => any;
};
export { scss };
//# sourceMappingURL=scss.d.ts.map