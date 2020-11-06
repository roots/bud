import {VueLoaderPlugin} from 'vue-loader'

/** Patched compiler.*/
/* eslint-disable */
const compiler = require('./vue-template-compiler/index')

/**
 * Register loader
 */
export const registerLoader = [
  'vue',
  require.resolve('vue-loader'),
]

/**
 * Register RuleSetUseItem
 */
export const registerItem = [
  'vue',
  {
    ident: 'vue',
    loader: 'vue',
    options: {
      compiler,
    },
  },
]

/**
 * Boot the Vue extension.
 */
export const boot: Framework.Extension.Boot = (
  bud: Framework.Bud,
) => {
  /**
   * Add vue loader style rules.
   */
  ;['css', 'sass'].map(
    rule =>
      bud.build.rules.has(rule) &&
      bud.build.rules.mutate(`${rule}.use`, use => [
        ...use.slice(0, 1),
        bud.build.items.get('vue'),
        ...use.slice(2),
      ]),
  )

  /**
   * vue-loader-plugin doesn't recognize the rule
   * as being set if it is set as a `oneOf` rule.
   *
   * So, instead of registering the rule through the normal
   * export function this hook registers the rule in the
   * outer `webpack.module.rules` key.
   */
  bud.hooks.on('webpack.module.rules', rules => [
    ...rules,
    {
      test: /\.vue$/,
      use: bud.build.items.get('vue'),
    },
  ])

  /**
   * Register vue-loader-plugin.
   */
  bud.extensions.register('vue-loader-plugin', {
    make: function () {
      return new VueLoaderPlugin()
    },
  })

  /**
   * Support vue as an alias
   */
  bud.alias({vue$: 'vue/dist/vue.esm.js'})

  /**
   * Resolve the vue file extension.
   */
  bud.when(
    !bud.build.config.get('resolve.extensions').includes('.vue'),
    bud =>
      bud.build.config.mutate('resolve.extensions', ext => [
        ...ext,
        '.vue',
      ]),
  )
}
