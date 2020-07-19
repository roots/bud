export interface webpackPluginInterface {
    setOptions?: Function;
    mergeOptions?: Function;
    make: Function;
    when?: Function;
}
export declare type budWebpackPlugin = () => webpackPluginInterface;
