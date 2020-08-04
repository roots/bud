declare const module: (bud: any) => {
    bud: any;
    name: string;
    isHot: any;
    isPostCss: any;
    rule: {
        test: RegExp;
        use: any[];
    };
    make: () => any;
};
export { module };
//# sourceMappingURL=module.d.ts.map