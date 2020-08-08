import MiniCssExtractPlugin from 'mini-css-extract-plugin';
declare const miniCssExtract: () => {
    setOptions: () => {
        hmr: any;
        filename: string;
    };
    make: () => MiniCssExtractPlugin;
    when: () => any;
};
export { miniCssExtract };
//# sourceMappingURL=miniCssExtract.d.ts.map