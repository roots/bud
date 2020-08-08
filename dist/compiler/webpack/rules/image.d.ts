declare const image: ImageRulesFactory;
export declare type imageLoaderOptions = {
    test: RegExp;
    use: [{
        loader: any | string;
        options: any;
    }];
};
export declare type imageLoaderInterface = {
    bud: any;
    make: () => any;
};
export declare type ImageRulesFactory = (bud: any) => imageLoaderInterface;
export { image };
//# sourceMappingURL=image.d.ts.map