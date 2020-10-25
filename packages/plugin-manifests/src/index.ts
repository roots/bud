import WordPressExternalsWebpackPlugin from '@roots/wordpress-externals-webpack-plugin'
import EntrypointsWebpackPlugin from '@roots/entrypoints-webpack-plugin'
import MergedManifestWebpackPlugin from '@roots/merged-manifest-webpack-plugin'

const plugins = {
  wordpressExternals: WordPressExternalsWebpackPlugin,
  entrypoints: EntrypointsWebpackPlugin,
  mergedManifest: MergedManifestWebpackPlugin,
}

export const boot = (instance: Framework.Bud): void => {
  instance.extensions.boot(
    Object.entries(plugins).reduce(
      (set, [label, Plugin]) => ({
        ...set,
        [label]: {
          make: () => new Plugin(),
        },
      }),
      {},
    ),
  )
}
