import {
  WebpackManifestPlugin,
  Options,
} from 'webpack-manifest-plugin'
import {Plugin} from '@roots/bud-framework'

const extension: Plugin<{apply: any}, Options> = {
  name: 'webpack-manifest-plugin',

  options: ({store}) =>
    store.get<Options>('extension.webpackManifestPlugin'),

  make: options => {
    return new WebpackManifestPlugin(options.all())
  },

  when: app => app.store.isTrue('manifest'),
}

export default extension
export const {name, options, make, when} = extension
