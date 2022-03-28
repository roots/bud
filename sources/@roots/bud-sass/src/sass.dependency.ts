/**
 * Imports sass/sass implementation
 *
 * @param logger - Signale logger
 * @returns dart-sass
 *
 * @public
 */
export async function importSassImplementation(logger: Console) {
  try {
    const sass = await import('sass')

    logger.info('sass successfully imported')

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
export function resolveLoader(logger: Console): string {
  try {
    return require.resolve('sass-loader')
  } catch (e) {
    logger.error(e)
    throw new Error(
      'sass-loader not found. Install it with `yarn add sass-loader --dev` or `npm i sass-loader --save-dev`. This may be a problem with bud; please let us know what you experienced by filing an issue at https://github.com/roots/bud',
    )
  }
}
