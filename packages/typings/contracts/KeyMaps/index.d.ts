/*
 declare type ConfigAccess = `config.${Omit<keyof Webpack.Configuration, 'devtool' | 'mode' | 'optimization'>}.${string}`
  declare type ConfigAccess = `config.devtool.${keyof Webpack.Configuration['devtool']}`
  declare type ConfigAccess = `config.mode.${keyof Webpack.Configuration['mode']}`
  declare type ConfigAccess = `config.optimization.${keyof Webpack.Configuration['optimization']}`
  declare type ConfigAccess = `config.optimization.runtimeChunk.name`

  declare type ContainerAccess = `features.${string}`
  declare type ContainerAccess = `presets.${string}`
  declare type ContainerAccess = `patterns.${string}`
  declare type ContainerAccess = `args.${string}`
  declare type ContainerAccess = ConfigAccess

    export interface Config extends Container {
    get(key: Config): any
  }
 */
