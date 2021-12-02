import type {Framework} from '@roots/bud-framework'
import type {Signale} from '@roots/bud-support'

/**
 * Add postcss-scss syntax
 *
 * @internal
 */
export function configure(app: Framework): void {
  app.hooks.on(
    'extension.@roots/bud-postcss.options',
    (options: Record<string, any>) => ({
      ...options,
      syntax: 'postcss-scss',
    }),
  )
}

/**
 * Attempt to add \@roots/bud-postcss if it is not already registered.
 *
 * @remarks
 * Both \@roots/bud-sass and \@roots/bud-postcss do stuff
 * on register, so there is a bit of a race going on.
 *
 * If \@roots/bud-sass wins the race we need to add
 * the plugin. When it is called again \@roots/bud-extensions
 * should ignore the request
 *
 * @param app - Bud instance
 * @param logger  - Bud logger
 *
 * @internal
 */
export async function use(
  app: Framework,
  logger: Signale,
): Promise<void> {
  try {
    logger.await(
      'postcss not yet registered. registering from @roots/bud-sass',
    )

    const postcss = await import('@roots/bud-postcss')
    await app.use(postcss)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
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
  const options = app.hooks.filter(
    'extension.@roots/bud-postcss.options',
  )

  if (options?.syntax == 'postcss-scss') {
    logger.success('postcss configured to handle scss syntax')
  } else {
    logger.warn(
      'There was a problem adding postcss-scss to the build. Consider filing an issue at https://github.com/roots/bud. You may be fine as long as you are not using postcss syntax in your scss stylesheets.',
    )
  }
}
