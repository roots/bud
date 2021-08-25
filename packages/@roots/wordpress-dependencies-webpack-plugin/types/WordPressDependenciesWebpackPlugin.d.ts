import * as Webpack from 'webpack'
declare class WordPressDependenciesWebpackPlugin {
  plugin: {
    name: string
    stage: number
  }
  protected compilation: Webpack.Compilation
  fileName: string
  manifest: WordPressDependencies.Manifest
  usedDependencies: {}
  constructor(options?: {fileName: string})
  apply(compiler: Webpack.Compiler): void
  normalModuleFactory(factory: any): void
  processAssets(assets: Webpack.Compilation['assets']): void
}
/**
 * @exports WordPressDependenciesWebpackPlugin
 */
export {WordPressDependenciesWebpackPlugin}
//# sourceMappingURL=WordPressDependenciesWebpackPlugin.d.ts.map
