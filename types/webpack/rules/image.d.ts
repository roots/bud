declare type imageLoaderOptions = {
    test: RegExp;
    use: [{
        loader: object | string;
        options: object;
    }];
};
declare type imageLoaderInterface = {
    builder: object;
    options: imageLoaderOptions;
    make: () => object;
    doHook: (name: string) => void;
};
declare type ImageRulesFactory = (builder: object) => imageLoaderInterface;
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