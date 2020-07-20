/**
 * ## bud.webpackPlugins
 * Webpack plugins written for usage with the bud framework.
 */
declare const webpackPlugins: Array<WebpackAdapterTuple>;
export { webpackPlugins };
export declare type WebpackAdapterTuple = [string, WebpackPluginAdapter];
export interface BudWebpackPlugin {
    setOptions?: Function;
    mergeOptions?: Function;
    make: Function;
    when?: Function;
}
export declare type WebpackPluginAdapter = () => BudWebpackPlugin;
