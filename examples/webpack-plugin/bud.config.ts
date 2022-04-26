import type {Bud} from '@roots/bud'

import {WebpackPlugin} from './WebpackPlugin'

/**
 * Bud config demonstrating webpack plugin usage
 *
 * @param bud - Bud instance
 */
export default async (app: Bud) => {
  /**
   * Use an imported webpack plugin
   */
  app.use(new WebpackPlugin(app.log))

  /**
   * Use a webpack plugin defined inline
   */
  app.use({
    label: 'inline-plugin',
    apply() {
      app.log({message: 'inline-plugin', suffix: 'applied!'})
    },
  })

  /**
   * Use an array of plugins
   */
  app.use([
    {
      label: 'array-plugin-1',
      apply() {
        app.log({message: 'array-plugin-1', suffix: 'applied!'})
      },
    },
    new (class {
      public apply() {
        app.log({message: 'array-plugin-2', suffix: 'applied!'})
      }
    })(),
  ])

  /**
   * Label a plugin with a name
   *
   * @remarks
   * This is useful for extension authors to make it easy to
   * allow users to configure a plugin.
   *
   * @remarks
   * If a plugin doesn't have an explicit name it will be inferred
   * for the constructor name. If there is no constructor name a name
   * will be generated for the plugin.
   */
  app.use({
    label: 'my-labeled-plugin',
    options: () => ({enabled: false}),
    make: () => new WebpackPlugin(),
    when: (_app, options) => options.is('enabled', true),
  })

  /** Now the constructor arguments are filterable */
  // @ts-ignore
  app.hooks.on('extension.my-labeled-plugin.options', opts =>
    opts.set('enabled', false),
  )

  /**
   * Use a plugin conditionally
   *
   * @remarks
   * This plugin will only be applied for production builds
   */
  app.use({
    label: 'my-conditional-plugin',
    make: () => new WebpackPlugin(app.log),
    when: app => app.isProduction,
  })

  /**
   * Immediately add an extension
   */
  await app.extensions.add({
    label: 'my-enqueued-plugin',
    make: () => new WebpackPlugin(app.log),
  })
}
