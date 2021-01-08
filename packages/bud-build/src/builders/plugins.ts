import {Webpack, Framework, Extension} from '@roots/bud-typings'
import {isNull} from '@roots/bud-support'

export namespace Extensions {
  export type Build = (
    this: Framework,
  ) => {plugins: Webpack.Configuration['plugins']}
}

export const plugins: Extensions.Build = function () {
  const plugins: Webpack.Plugin[] = this.hooks.filter<
    Webpack.Configuration['plugins']
  >(
    'webpack.plugins',
    this.extensions
      .getEntries()
      .map(([, extension]: [string, Extension]) =>
        extension.isPlugin() ? extension.get('make') : null,
      )
      .filter(
        (maybePlugin: Extension) => !isNull(maybePlugin),
      ) as Webpack.Plugin[],
  )

  return {
    plugins,
  }
}
