declare const image: ImageRulesFactory;
export declare type imageLoaderOptions = {
    test: RegExp;
    use: [{
        loader: object | string;
        options: object;
    }];
};
export declare type imageLoaderInterface = {
    bud: object;
    make: () => object;
};
export declare type ImageRulesFactory = (bud: object) => imageLoaderInterface;
export { image };
//# sourceMappingURL=image.d.ts.map