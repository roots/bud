export interface webpackPluginInterface {
  setOptions?: Function;
  mergeOptions?: Function;
  make: Function;
  when?: Function;
}

export type budWebpackPlugin = () => webpackPluginInterface;
