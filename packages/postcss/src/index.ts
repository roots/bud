import * as Framework from '@roots/bud-framework'

const DEFAULT_PLUGINS: PostCssPluginStoreValue = {
  autoprefixer: [require('autoprefixer'), {}],
}

export const register = (bud: Framework.Bud): void => {
  bud.hooks.on('register.store', () => {
    bud.store.create('postcss', {
      plugins: DEFAULT_PLUGINS,
      sourceMapOptions: null,
      syntax: null,
      parser: null,
      stringifier: null,
    })
  })

  bud.hooks.on('register.loaders', () => ({
    ['postcss-loader']: require.resolve('postcss-loader'),
  }))

  bud.hooks.on('register.ruleset.use', () => ({
    ident: 'postcss-loader',

    loader: function () {
      return this.store['loaders'].get('postcss-loader')
    },

    options: function () {
      const options = this.store['postcss']
      return {
        ...options,
        plugins: Object.entries(options).reduce(
          (acc, [, tuple]) => [...acc, tuple],
          [],
        ),
      }
    },
  }))

  bud.hooks.on('module.rule.uses.css', css => {
    css.push(bud.store['uses'].get('postcss-loader').make())
    return css
  })
}

/**
 * PostCSS loader plugin type
 */
declare type PluginTuple = [Plugin | Transformer, unknown]

/**
 * The store plugin type
 */
declare type PostCssPluginStoreValue = {
  [key: string]: PluginTuple
}
