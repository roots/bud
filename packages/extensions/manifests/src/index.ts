import WordPressExternalsWebpackPlugin from './WordPressExternalsWebpackPlugin'
import EntrypointsWebpackPlugin from './EntrypointsWebpackPlugin'
import MergedManifestWebpackPlugin from './MergedManifestWebpackPlugin'

export const boot = (instance: Framework.Bud): void => {
  instance.extensions.boot({
    wordpressExternals: {
      make: () => new WordPressExternalsWebpackPlugin(),
    },
    entrypoints: {
      make: () => new EntrypointsWebpackPlugin(),
    },
    mergedManifest: {
      make: () => new MergedManifestWebpackPlugin(),
    },
  })
}
