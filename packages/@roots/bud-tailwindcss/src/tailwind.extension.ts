import type {Extension, Framework} from '@roots/bud-framework'
import {chalk, lodash} from '@roots/bud-support'

import {tailwind} from './bud.tailwind'
import * as requirements from './tailwind.requirements'

const {isUndefined} = lodash

export interface BudTailwindCssExtension
  extends Extension.Module {
  name: '@roots/bud-tailwindcss'
  api: {tailwind}
  boot: (app: Framework) => Promise<void>
}

/**
 * Load user configuration path
 *
 * @internal
 */
const getVerifiedUserConfigPath = async function (
  this: Framework,
): Promise<string> {
  try {
    const configPath = this.path('project', 'tailwind.config.js')

    await import(configPath)

    this.success(
      `loaded user tailwindcss config from ${chalk.green(
        configPath,
      )}`,
    )

    return configPath
  } catch (e) {
    this.error({
      message:
        '@roots/bud-tailwindcss failed to load user config',
    })
    return null
  }
}

/**
 * TailwindCSS Extension
 *
 * @public
 */
export const BudTailwindCssExtension: BudTailwindCssExtension = {
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

    if (isUndefined(app.postcss)) {
      log.error(
        '@roots/bud-tailwindcss has missing dependencies',
        'exiting early.',
      )
      return
    }

    const meetsRequirements = await requirements.verify()
    if (!meetsRequirements) {
      log.error(
        '@roots/bud-tailwindcss has missing dependencies',
        'exiting early.',
      )
      return
    }

    try {
      const tailwindcss = await import('tailwindcss')

      const config: string | null =
        await getVerifiedUserConfigPath.bind(app)()

      app.postcss.setPlugins({
        'postcss-import': app.postcss.get('postcss-import'),
        tailwindcss: config
          ? [tailwindcss.default, config]
          : tailwindcss.default,
        'postcss-nested': app.postcss.get('postcss-nested'),
        'postcss-preset-env': app.postcss.get(
          'postcss-preset-env',
        ),
      })

      log.success('postcss has been configured for tailwindcss')
    } catch (e) {
      log.error({message: e})
    }
  },
}
