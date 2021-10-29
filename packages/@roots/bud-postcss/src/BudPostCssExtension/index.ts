import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import postcssPreset from 'postcss-preset-env'

import {PostCssConfig} from '../PostCssConfig'

const {pathExists} = fs

export interface BudPostCssExtension extends Extension.Module {
  name: Extension.Module['name'] & '@roots/bud-postcss'

  api: Extension.Module['api'] & {
    postcss: PostCssConfig
  }

  boot: Extension.Module['boot']
}

export const BudPostCssExtension: BudPostCssExtension = {
  name: '@roots/bud-postcss',

  api: {
    postcss: new PostCssConfig(),
  },

  register: function () {},

  boot: async function ({build, path, postcss, warn, project}) {
    const hasPostCssConfig = await pathExists(
      path('project', 'postcss.config.js'),
    )

    build.loaders.postcss = new Loader('postcss-loader')

    build.items.postcss = new Item({
      loader: ({build}) => build.loaders.postcss,
      options: ({postcss}) => ({
        postcssOptions: {
          config: hasPostCssConfig,
          plugins: Object.values(postcss.plugins),
        },
        sourceMap: true,
      }),
    })

    build.rules.css.setUse(({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.css,
      build.items.postcss,
    ])

    if (hasPostCssConfig) return

    const installed = project.getKeys('installed')

    const isInstalled = (plugin: string) =>
      installed.includes(plugin)

    isInstalled('postcss-import')
      ? postcss.setPlugin('postcss-import', postcssImport)
      : warn(`PostCSS plugin 'postcss-import' is not installed`)

    isInstalled('postcss-import')
      ? postcss.setPlugin('postcss-nested', postcssNested)
      : warn(`PostCSS plugin 'postcss-nested' is not installed`)

    isInstalled('postcss-import')
      ? postcss.setPlugin('postcss-preset-env', [
          postcssPreset,
          {
            stage: 1,
            features: {
              'focus-within-pseudo-class': false,
            },
          },
        ])
      : warn(`PostCSS plugin 'postcss-nested' is not installed`)
  },
}
