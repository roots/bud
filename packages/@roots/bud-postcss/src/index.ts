import './interface'

import {Item, Loader} from '@roots/bud-build'
import {Framework, Module} from '@roots/bud-framework'
import {Config} from './api'

const extension: Module = {
  name: '@roots/bud-postcss',
  api: app => ({
    postcss: new Config(app),
  }),

  boot: (app: Framework) => {
    app.build.loaders.postcss = new Loader(app =>
      require.resolve('postcss-loader'),
    )

    app.build.items.postcss = new Item({
      loader: app => app.build.loaders.postcss,
      options: app => ({
        postcssOptions: {
          config: app.postcss.hasProjectConfig,
          plugins: Object.values(
            app.postcss.plugins,
          ).map(plugin => require(plugin[0])(plugin[1])),
        },
        sourceMap: true,
      }),
    })

    app.build.rules.css.setUse(app => [
      app.isProduction
        ? app.build.items.minicss
        : app.build.items.style,
      app.build.items.css,
      app.build.items.postcss,
    ])

    !app.postcss.hasProjectConfig &&
      app.postcss.setPlugins([
        'postcss-import',
        ['postcss-preset-env', {stage: 1}],
      ])
  },
}

export default extension
export const {name, boot, api} = extension
