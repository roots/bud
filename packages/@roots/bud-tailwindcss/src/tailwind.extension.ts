import {tailwind} from './bud.tailwind'
import type {Extension} from './tailwind.interface'

export const BudTailwindCssExtension: Extension = {
  /**
   * @public
   */
  name: '@roots/bud-tailwindcss',

  /**
   * @public
   */
  api: {tailwind},

  /**
   * @public
   */
  boot: async app => {
    const log = app.logger.instance.scope(
      ...app.logger.context,
      'extensions',
      'tailwindcss',
    )

    if (
      !app.extensions.has('@roots/bud-postcss') ||
      !app.extensions.get('@roots/bud-postcss').meta.registered
    ) {
      try {
        log.warn({
          message:
            '@roots/bud-tailwindcss booted before @roots/bud-postcss registered. Attempting to use the plugin.',
        })
        const postcss = await import('@roots/bud-postcss')
        await app.extensions.add(postcss)

        log.success(
          '@roots/bud-tailwindcss successfully added @roots/bud-postcss',
        )
      } catch (e) {
        app.logger.instance
          .scope(...app.logger.context, 'tailwindcss')
          .error({
            message:
              '@roots/bud-postcss is required by @roots/bud-tailwindcss',
          })
        return
      }
    }

    try {
      Promise.all(
        [
          'postcss-import',
          'postcss-nested',
          'postcss-preset-env',
        ].map(async pluginName => {
          if (app.postcss.has(pluginName)) return

          const plugin = await import(pluginName)
          app.postcss.set(pluginName, [plugin])
        }),
      )
      log.success(
        'all required postcss extensions are available',
      )
    } catch (e) {
      log.error({
        message:
          '@roots/bud-tailwindcss failed to load required postcss plugins. aborting extension execution.',
      })
      log.error(e)
      return
    }

    try {
      const tailwindcss = await import('tailwindcss')

      app.postcss.setPlugins({
        'postcss-import': app.postcss.get('postcss-import'),
        tailwindcss: [tailwindcss],
        'postcss-nested': app.postcss.get('postcss-nested'),
        'postcss-preset-env': app.postcss.get(
          'postcss-preset-env',
        ),
      })
      log.success('postcss has been configured for tailwindcss')
    } catch (e) {
      app.logger.instance
        .scope(
          ...app.logger.context,
          'extensions',
          'tailwindcss',
        )
        .error({message: e})

      return
    }
  },
}
