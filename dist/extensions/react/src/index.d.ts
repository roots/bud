declare const DependencyExtractionWebpackPlugin: any;
declare const adapter: () => {
    mergeOptions: (this: any) => any;
    make: (this: any) => any;
};
declare const vue: () => {
    make: (this: any) => void;
    /**
     * addVue
     *
     * Callback adding vue-loader to webpack.modules.
     */
    addVue: (webpackModules: any[]) => any[];
    /**
     * addVueStyle
     *
     * Callback adding vue-style-loader to webpack.modules.
     */
    addVueStyle: (rules: any[]) => any[];
};
//# sourceMappingURL=index.d.ts.map