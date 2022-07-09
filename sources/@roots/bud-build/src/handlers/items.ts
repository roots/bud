import type {Bud} from '@roots/bud-framework/bud'
import type {Item} from '@roots/bud-framework/services/build'

/**
 * CSS loader
 *
 * @public
 */
export const css = async (app: Bud): Promise<Item> =>
  app.build
    .makeItem()
    .setLoader('css')
    .setOptions(({build, hooks}) => ({
      importLoaders: build.rules.css.getUse().length - 2,
      modules: false,
      sourceMap: hooks.filter('build.devtool') ? true : false,
    }))

/**
 * CSS module loader
 *
 * @public
 */
export const cssModule = async (app: Bud): Promise<Item> =>
  app.build
    .makeItem()
    .setLoader('css')
    .setOptions(({build, hooks}) => ({
      esModule: true,
      importLoaders: build.rules.cssModule.getUse().length - 2,
      localIdentName: '[name]__[local]___[hash:base64:5]',
      modules: true,
      sourceMap: hooks.filter('build.devtool') ? true : false,
    }))

/**
 * CSV loader
 *
 * @public
 */
export const csv = async (app: Bud): Promise<Item> =>
  app.build.makeItem().setLoader('csv')

/**
 * HTML loader
 *
 * @public
 */
export const html = async (app: Bud): Promise<Item> =>
  app.build.makeItem().setLoader('html')

/**
 * Style loader
 *
 * @public
 */
export const style = async (app: Bud): Promise<Item> =>
  app.build.makeItem().setLoader('style')

/**
 * Markdown loader
 *
 * @public
 */
export const md = async (app: Bud): Promise<Item> =>
  app.build.makeItem({loader: 'md'})

/**
 * MiniCss loader
 *
 * @public
 */
export const minicss = async (app: Bud): Promise<Item> =>
  app.build
    .makeItem()
    .setLoader('minicss')
    .setOptions(app => ({
      publicPath: app.hooks.filter('build.output.publicPath'),
    }))

/**
 * Raw loader
 *
 * @public
 */
export const raw = async ({build}: Bud): Promise<Item> =>
  build.makeItem().setLoader(`raw`)

/**
 * File loader
 *
 * @public
 */
export const file = async (app: Bud): Promise<Item> =>
  app.build
    .makeItem()
    .setLoader(`file`)
    .setOptions(app => ({
      name: app.hooks.filter('feature.hash')
        ? app.hooks.filter('value.hashFormat').concat('.[ext]')
        : app.hooks.filter('value.fileFormat').concat('.[ext]'),
    }))

/**
 * Xml loader
 *
 * @public
 */
export const xml = async (app: Bud): Promise<Item> =>
  app.build.makeItem().setLoader(`xml`)

/**
 * Yml loader
 *
 * @public
 */
export const yml = async (app: Bud): Promise<Item> =>
  app.build.makeItem().setLoader(`yml`)
