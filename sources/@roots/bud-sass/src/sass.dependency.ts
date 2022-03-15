import type {Signale} from '@roots/bud-support'

/**
 * Imports sass/sass implementation
 *
 * @param logger - Signale logger
 * @returns dart-sass
 *
 * @public
 */
export async function importSassImplementation(logger: Signale) {
  try {
    logger.await('attempting to import sass')

    const sass = await import('sass')

    logger.success('sass imported')

    return sass
  } catch (e) {
    logger.error(e)
    throw new Error(
      'sass not found. Install it with `yarn add sass --dev` or `npm i sass --save-dev`. This may be a problem with bud; please let us know what you experienced by filing an issue at https://github.com/roots/bud',
    )
  }
}

/**
 * Resolves sass-loader
 *
 * @returns sass-loader path
 *
 * @public
 */
export function resolveLoader(logger: Signale): string {
  try {
    return require.resolve('sass-loader')
  } catch (e) {
    logger.error(e)
    throw new Error(
      'sass-loader not found. Install it with `yarn add sass-loader --dev` or `npm i sass-loader --save-dev`. This may be a problem with bud; please let us know what you experienced by filing an issue at https://github.com/roots/bud',
    )
  }
}
