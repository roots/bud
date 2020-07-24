export declare type imageLoaderOptions = {
    test: RegExp;
    use: [{
        loader: object | string;
        options: object;
    }];
};
export declare type imageLoaderInterface = {
    bud: object;
    options: imageLoaderOptions;
    make: () => object;
    doHook: (name: string) => void;
};
export declare type ImageRulesFactory = (bud: object) => imageLoaderInterface;
/**
 * Image module rules
 *
 * @type     {Function} image
 * @property {imageLoaderOptions} options
 * @return {object}
 */
declare const image: ImageRulesFactory;
export { image };
//# sourceMappingURL=image.d.ts.map