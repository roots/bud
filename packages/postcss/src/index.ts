import Framework from '@roots/bud-framework'
exports = Framework

/* const DEFAULT_PLUGINS: PostCssPluginStoreValue = {
  autoprefixer: [require('autoprefixer'), {}],
}

export const registerLoaders = {
  'postcss-loader': require.resolve('postcss-loader'),
}

export const updateRule = (
  bud: Framework.IBud,
  loader: any[],
): void => {
  loader.push(bud.components['loaders'].get('postcss-loader'))
}

export const register = (bud: Framework.IBud): void => {
  bud.hooks.on('register.store', () => {
    bud.store.create('postcss', {
      plugins: DEFAULT_PLUGINS,
      sourceMapOptions: null,
      syntax: null,
      parser: null,
      stringifier: null,
    })
  })

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

  declare type PluginTuple = [Plugin | Transformer, unknown]

declare type PostCssPluginStoreValue = {
  [key: string]: PluginTuple
}
} */
