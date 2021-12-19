import {Item, Loader, Rule} from '@roots/bud-build'
import {Signale} from 'signale'

import {importSassImplementation} from './sass.dependency'

/**
 * Webpack rule factory
 *
 * @param logger - Bud logger
 * @returns sass webpack rule
 *
 * @internal
 */
export function rule(logger: Signale): Rule {
  logger.await('configuring scss webpack rule')

  const rule = new Rule({
    test: app => app.store.get('patterns.sass'),
    exclude: app => app.store.get('patterns.modules'),
    use: ({build, isProduction}) =>
      Array.from(
        new Set([
          isProduction ? build.items.minicss : build.items.style,
          build.items.css,
          build.items.postcss ?? undefined,
          build.items['resolve-url'],
          build.items.sass,
        ]),
      ).filter(Boolean),
  })

  logger.success('configuring scss webpack rule')

  return rule
}

/**
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
export async function item(logger): Promise<Item> {
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
export function loader(logger: Signale): Loader {
  logger.await('configuring scss loader')

  const loader = new Loader(require.resolve('sass-loader'))

  logger.success('configuring scss loader')
  return loader
}

/**
 * Resolve extensions callback
 *
 * @param extensions - current extensions value
 * @returns extensions + '.scss'
 *
 * @internal
 */
export function resolveExtensions(extensions: Array<string>) {
  return [...new Set([...extensions, '.scss'])]
}
