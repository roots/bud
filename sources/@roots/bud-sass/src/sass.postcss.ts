import type {Framework} from '@roots/bud-framework'

/**
 * Add postcss-scss syntax
 *
 * @internal
 */
export function configure(app: Framework): void {
  app.hooks.on('extension.@roots/bud-postcss.options', options => ({
    syntax: 'postcss-scss',
  }))
}

/**
 * Verifies that postcss-scss is installed
 *
 * @param app - Bud instance
 * @param logger - Extension logger
 *
 * @internal
 */
export function verify(app: Framework, logger: Console): void {
  const options = app.hooks.filter('extension.@roots/bud-postcss.options')

  if (options?.syntax == 'postcss-scss') {
    logger.info('postcss configured to handle scss syntax')
  } else {
    logger.warn(
      'There was a problem adding postcss-scss to the build. Consider filing an issue at https://github.com/roots/bud. You may be fine as long as you are not using postcss syntax in your scss stylesheets.',
    )
  }
}
