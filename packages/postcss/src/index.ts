import Bud from '@roots/bud-framework'

const DEFAULT_PLUGINS: PostCssPluginStoreValue = {
  autoprefixer: [require('autoprefixer'), {}],
}

export const register = (bud: Bud): void => {
  bud.on('register.store', () => {
    bud.store.create('postcss', {
      plugins: DEFAULT_PLUGINS,
      sourceMapOptions: null,
      syntax: null,
      parser: null,
      stringifier: null,
    })
  })

  bud.on('register.loaders', () => ({
    ['postcss-loader']: require.resolve('postcss-loader'),
  }))

  bud.on('register.ruleset.use', () => ({
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

  bud.on('module.rule.uses.css', css => {
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
