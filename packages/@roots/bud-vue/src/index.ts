import {VueLoaderPlugin} from 'vue-loader'
import {Module, Webpack} from '@roots/bud-typings'

// Extension name
export const name: Module['name'] = '@roots/bud-vue'

// Extension boot
export const boot: Module['boot'] = app => {
  /**
   * Returns true if project utilizes vue
   */
  const usesVue = ({disk, options}) =>
    disk.glob.sync(['*.vue', '**/*.vue'], {
      cwd: disk.path.join(
        disk.get('project').baseDir,
        options.get('src'),
      ),
    }).length > 0

  // Vue stylesheet handling
  const addStyleSupport = ({build}, rule): boolean => {
    const useItems = build.access(`rules.${rule}.use`)

    build.set(`rules.${rule}.use`, [
      build.access('items.vue-style'),
      ...useItems.splice(1),
    ])

    return true
  }

  /**
   * Register vue if needed
   */
  app.when(usesVue, ({sequence}) =>
    sequence([
      /**
       * Config builder
       */
      ({build}) =>
        build
          /**
           * Add vue-loader
           */
          .set('items.vue', {
            loader: require.resolve('vue-loader'),
          })

          /**
           * Add vue-style-loader
           */
          .set('items.vue-style', {
            loader: 'vue-style-loader',
          }),

      /**
       * Hooks
       */
      ({hooks}) =>
        /**
         * vue-loader-plugin doesn't recognize the rule
         * as being set if it is set as a `oneOf` rule.
         *
         * So, instead of registering the rule through the normal
         * export function this hook registers the rule in the
         * outer `webpack.module.rules` key.
         */
        hooks
          .on(
            'webpack.module.rules',
            (
              rules: Webpack.Configuration['module']['rules'],
            ) => [
              {
                test: app.store.get('patterns.vue'),
                use: [app.build.get('items.vue')],
              },
              ...rules,
            ],
          )

          /**
           * Add vue alias
           */
          .hooks.on(
            'webpack.resolve.alias',
            (
              aliases: Webpack.Configuration['resolve']['alias'],
            ) => ({
              ...aliases,
              vue$: 'vue/dist/vue.esm.js',
            }),
          )

          /**
           * Resolve .vue filetype
           */
          .hooks.on(
            'webpack.resolve.extensions',
            (
              extensions: Webpack.Configuration['resolve']['extensions'],
            ) => [...extensions, '.vue'],
          ),

      /**
       * Add vue-loader-plugin
       */
      ({extensions}) =>
        extensions.add('vue-loader-plugin', {
          make: () => new VueLoaderPlugin(),
        }),

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
