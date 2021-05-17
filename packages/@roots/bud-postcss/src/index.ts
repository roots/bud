import './interface'
import {Item, Loader} from '@roots/bud-build'
import {Module} from '@roots/bud-framework'
import {pathExistsSync} from 'fs-extra'
import {Config} from './Config'

const extension: Module = {
  name: '@roots/bud-postcss',

  api: app => ({
    postcss: new Config(app),
  }),

  boot: ({build, path, postcss}) => {
    build.loaders.postcss = new Loader(
      require.resolve('postcss-loader'),
    )

    build.items.postcss = new Item({
      loader: ({build}) => build.loaders.postcss,
      options: ({path, postcss}) => ({
        postcssOptions: {
          config: pathExistsSync(
            path('project', 'postcss.config.js'),
          ),
          plugins: Object.values(
            postcss.plugins,
          ).map(([plugin, options]) => require(plugin)(options)),
        },
        sourceMap: true,
      }),
    })

    build.rules.css.setUse(({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.css,
      build.items.postcss,
    ])

    !pathExistsSync(path('project', 'postcss.config.js')) &&
      postcss.setPlugins([
        'postcss-import',
        ['postcss-preset-env', {stage: 1}],
      ])
  },
}

export default extension
export const {name, boot, api} = extension
