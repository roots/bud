declare const font: (bud: any) => {
    bud: any;
    name: string;
    rule: {
        test: RegExp;
        use: {
            loader: any;
            options: any;
        }[];
    };
    make: () => any;
};
export { font };
//# sourceMappingURL=font.d.ts.map