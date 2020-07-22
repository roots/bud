/**
 * Webpack plugin adapters
 */
declare const webpackPlugins: WebpackPluginAdapters;
export { webpackPlugins };
export declare type WebpackPluginAdapter = () => WebpackPluginAdapater;
export declare type WebpackPluginAdapters = WebpackPluginAdapterDeclaration[];
export declare type WebpackPluginAdapterDeclaration = [string, WebpackPluginAdapter];
export interface WebpackPluginAdapater {
    setOptions?: Function;
    mergeOptions?: Function;
    make: Function;
    when?: Function;
}
//# sourceMappingURL=index.d.ts.map