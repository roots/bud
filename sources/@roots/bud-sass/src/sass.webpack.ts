import {Item, Loader} from '@roots/bud-build'

import {importSassImplementation} from './sass.dependency'

/*
 * Webpack item factory
 *
 * @remarks
 * This imports the sass implementation (sass/sass)
 *
 * @param logger - Bud logger
 * @returns Promised Item
 *
 * @internal
 */
export async function item(logger: any): Promise<Item> {
  logger.await('configuring scss ruleset use item')

  const implementation = await importSassImplementation(logger)

  const item = new Item({
    loader: ({build}) => build.loaders.sass,
    options: () => ({
      implementation,
      sourceMap: true,
    }),
  })

  logger.success('configuring scss ruleset use item')
  return item
}

/**
 * Webpack loader factory
 *
 * @param logger - Bud logger
 * @returns sass-loader
 *
 * @internal
 */
export function loader(logger: any): Loader {
  logger.await('configuring scss loader')

  const loader = new Loader(require.resolve('sass-loader'))

  logger.success('configuring scss loader')
  return loader
}
