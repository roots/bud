import type {Framework} from '@roots/bud-framework'
import type {Signale} from '@roots/bud-support'

/**
 * Add postcss-scss syntax
 *
 * @internal
 */
export function configure(app: Framework): void {
  app.extensions
    .get('@roots/bud-postcss')
    .setOption('syntax', 'postcss-scss')
}

/**
 * Verifies that postcss-scss is installed
 *
 * @param app - Bud instance
 * @param logger - Extension logger
 *
 * @internal
 */
export function verify(app: Framework, logger: Signale): void {
  const {options} = app.extensions.get('@roots/bud-postcss')

  if (options.is('syntax', 'postcss-scss')) {
    logger.success('postcss configured to handle scss syntax')
  } else {
    logger.warn(
      'There was a problem adding postcss-scss to the build. Consider filing an issue at https://github.com/roots/bud. You may be fine as long as you are not using postcss syntax in your scss stylesheets.',
    )
  }
}
