import {Bud} from '@roots/bud-framework'

/**
 * .css handler factory
 *
 * @public
 */
export const css = (app: Bud) =>
  app.build
    .makeItem()
    .setLoader(`css`)
    .setOptions(({hooks}) => ({
      importLoaders: 1,
      sourceMap: hooks.filter('build.devtool') ? true : false,
    }))

/**
 * .css handler factory
 *
 * @public
 */
export const cssModule = (app: Bud) =>
  app.build
    .makeItem()
    .setLoader(`css`)
    .setOptions(({hooks}) => ({
      importLoaders: 1,
      localIdentName: '[name]__[local]___[hash:base64:5]',
      modules: true,
      sourceMap: hooks.filter('build.devtool') ? true : false,
    }))

/**
 * .csv handler factory
 *
 * @public
 */
export const csv = (app: Bud) => app.build.makeItem().setLoader(`csv`)

/**
 * .html handler factory
 *
 * @public
 */
export const html = (app: Bud) => app.build.makeItem().setLoader(`html`)

/**
 * Factory {@link Item} for style
 *
 * @public
 */
export const style = (app: Bud) => app.build.makeItem().setLoader(`style`)

/**
 * Factory {@link Item} for markdown
 *
 * @public
 */
export const md = (app: Bud) => app.build.makeItem({loader: 'md'})

/**
 * Factory {@link Item} for minicss-extract-plugin
 * @public
 */
export const minicss = (app: Bud) =>
  app.build.makeItem().setLoader(`minicss`)

/**
 * CSS rule which accounts for env
 * @public
 */
export const precss = (app: Bud) =>
  app.build.makeItem().setLoader(app.isProduction ? `minicss` : `style`)

export const raw = ({build}: Bud) => build.makeItem().setLoader(`raw`)

/**
 * Factory {@link Item} for file
 *
 * @public
 */
export const file = (app: Bud) =>
  app.build
    .makeItem()
    .setLoader(`file`)
    .setOptions(app => ({
      name: app.hooks.filter('feature.hash')
        ? app.hooks.filter('value.hashFormat').concat('.[ext]')
        : app.hooks.filter('value.fileFormat').concat('.[ext]'),
    }))

/**
 * Factory {@link Item} resolve-url
 *
 * @public
 */
export const resolveUrl = (app: Bud) =>
  app.build
    .makeItem()
    .setLoader(`resolveUrl`)
    .setOptions(({path, hooks}) => ({
      root: path('@src'),
      sourceMap: hooks.filter('build.devtool') ? true : false,
    }))

/**
 * Factory {@link Item} for xml
 *
 * @public
 */
export const xml = (app: Bud) => app.build.makeItem().setLoader(`xml`)

/**
 * Factory {@link Item} for yml
 *
 * @public
 */
export const yml = (app: Bud) => app.build.makeItem().setLoader(`yml`)
