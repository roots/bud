import {VueLoaderPlugin} from 'vue-loader'

// Extension name
export const name = '@roots/bud-vue'

// Extension boot
export const boot = app => {
  /**
   * Returns true if project utilizes vue
   */
  const usesVue = app =>
    app.disk.glob.sync(['*.vue', '**/*.vue'], {
      cwd: app.disk.path.join(
        app.disk.get('project').baseDir,
        app.options.get('src'),
      ),
    }).length > 0

  // Vue stylesheet handling
  const addStyleSupport = (app, rule): boolean => {
    const useItems = app.build.access(`rules.${rule}.use`)

    app.build.set(`rules.${rule}.use`, [
      app.build.access('items.vue-style'),
      ...useItems.splice(1),
    ])

    return true
  }

  /**
   * Register vue if needed
   */
  app.when(usesVue(app), app =>
    app.sequence([
      /**
       * Add vue-loader
       */
      () =>
        app.build.set('items.vue', {
          loader: require.resolve('vue-loader'),
        }),

      /**
       * Add vue-style-loader
       */
      () =>
        app.build.set('items.vue-style', {
          loader: 'vue-style-loader',
        }),

      /**
       * vue-loader-plugin doesn't recognize the rule
       * as being set if it is set as a `oneOf` rule.
       *
       * So, instead of registering the rule through the normal
       * export function this hook registers the rule in the
       * outer `webpack.module.rules` key.
       */
      () =>
        app.hooks.on('webpack.module.rules', rules => [
          {
            test: app.store.get('patterns.vue'),
            use: [app.build.get('items.vue')],
          },
          ...rules,
        ]),

      /**
       * Add vue-loader-plugin
       */
      () =>
        app.extensions.add('vue-loader-plugin', {
          make: () => new VueLoaderPlugin(),
        }),

      /**
       * Add vue alias
       */
      () =>
        app.hooks.on('webpack.resolve.alias', aliases => ({
          ...aliases,
          vue$: 'vue/dist/vue.esm.js',
        })),

      /**
       * Resolve .vue file extension
       */
      () =>
        app.hooks.on(
          'webpack.resolve.extensions',
          extensions => [...extensions, '.vue'],
        ),

      /**
       * Add vue css handling
       */
      () =>
        // Css support
        addStyleSupport(app, 'css') &&
        app.build.has('rules.sass') &&
        addStyleSupport(app, 'sass'),
    ]),
  )
}
