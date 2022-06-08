import {Bud} from '@roots/bud-framework'
import * as json5Parser from 'json5'
import * as tomlParser from 'toml'

/**
 * .js rule
 *
 * @public
 */
export const js = (app: Bud) =>
  app.build
    .makeRule()
    .setTest(({hooks}) => hooks.filter('pattern.js'))
    .setInclude([app => app.path('@src')])
    .setUse([])

/**
 * .css rule
 *
 * @public
 */
export const css = (app: Bud) =>
  app.build
    .makeRule()
    .setTest(({hooks}) => hooks.filter('pattern.css'))
    .setInclude([app => app.path('@src')])
    .setUse([`precss`, `css`])

/**
 * .module.css rule
 *
 * @public
 */
export const cssModule = (app: Bud) =>
  app.build
    .makeRule()
    .setTest(({hooks}) => hooks.filter('pattern.cssModule'))
    .setInclude([app => app.path('@src')])
    .setUse([`precss`, `cssModule`])

/**
 * .jpg, .jpeg, .png, .gif rule
 *
 * @public
 */
export const image = (app: Bud) =>
  app.build
    .makeRule()
    .setTest(({hooks}) => hooks.filter('pattern.image'))
    .setInclude([app => app.path('@src')])
    .setType('asset/resource')
    .setGenerator(app => ({
      filename: app.hooks.filter('feature.hash')
        ? 'images/'
            .concat(app.hooks.filter('value.hashFormat'))
            .concat('[ext]')
        : 'images/'
            .concat(app.hooks.filter('value.fileFormat'))
            .concat('[ext]'),
    }))

/**
 * .webp assets factorry
 *
 * @remarks
 * Returns {@link Rule} for `asset/resource`
 *
 * @public
 */
export const webp = (app: Bud) =>
  app.build
    .makeRule()
    .setTest(({hooks}) => hooks.filter('pattern.webp'))
    .setInclude([app => app.path('@src')])
    .setType('asset/resource')
    .setGenerator(app => ({
      filename: app.hooks.filter('feature.hash')
        ? 'images/'
            .concat(app.hooks.filter('value.hashFormat'))
            .concat('[ext]')
        : 'images/'
            .concat(app.hooks.filter('value.fileFormat'))
            .concat('[ext]'),
    }))

/**
 * Returns {@link Rule} for `.woff`/`.otf` handling
 * .svg rule
 *
 * @public
 */
export const svg = (app: Bud) =>
  app.build
    .makeRule()
    .setTest(({hooks}) => hooks.filter('pattern.svg'))
    .setInclude([app => app.path('@src')])
    .setType('asset/resource')
    .setGenerator(app => ({
      filename: app.hooks.filter('feature.hash')
        ? 'svg/'
            .concat(app.hooks.filter('value.hashFormat'))
            .concat('[ext]')
        : 'svg/'
            .concat(app.hooks.filter('value.fileFormat'))
            .concat('[ext]'),
    }))

/**
 * .woff, .woff2, .otf rule
 *
 * @public
 */
export const font = (app: Bud) =>
  app.build
    .makeRule()
    .setType('asset')
    .setTest(({hooks}) => hooks.filter('pattern.font'))
    .setInclude([app => app.path('@src')])
    .setGenerator(app => ({
      filename: app.hooks.filter('feature.hash')
        ? 'fonts/'
            .concat(app.hooks.filter('value.hashFormat'))
            .concat('[ext]')
        : 'fonts/'
            .concat(app.hooks.filter('value.fileFormat'))
            .concat('[ext]'),
    }))

/**
 * Returns {@link Rule} for `.jsonc` handling
 *
 * @public
 */
export const json = (app: Bud) =>
  app.build
    .makeRule()
    .setType('json')
    .setInclude([app => app.path()])
    .setExclude([app => app.path('@modules')])
    .setTest(({hooks}) => hooks.filter('pattern.json'))
    .setParser({parse: json5Parser.parse})

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 *
 * @public
 */
export const yml = (app: Bud) =>
  app.build
    .makeRule()
    .setInclude([app => app.path()])
    .setExclude([app => app.path('@modules')])
    .setTest(({hooks}) => hooks.filter('pattern.yml'))
    .setUse(['yml'])

/**
 * Returns {@link Rule} for `.html` handling
 *
 * @public
 */
export const html = (app: Bud) =>
  app.build
    .makeRule()
    .setInclude([app => app.path()])
    .setExclude([app => app.path('@modules')])
    .setTest(({hooks}) => hooks.filter('pattern.html'))
    .setUse([`html`])

/**
 * Returns {@link Rule} for `.csv` handling
 *
 * @public
 */
export const csv = (app: Bud) =>
  app.build
    .makeRule()
    .setInclude([app => app.path()])
    .setExclude([app => app.path('@modules')])
    .setTest(({hooks}) => hooks.filter('pattern.csv'))
    .setUse([`csv`])

/**
 * Returns {@link Rule} for `.xml` handling
 *
 * @public
 */
export const xml = (app: Bud) =>
  app.build
    .makeRule()
    .setInclude([app => app.path()])
    .setExclude([app => app.path('@modules')])
    .setTest(({hooks}) => hooks.filter('pattern.xml'))
    .setUse([`xml`])

/**
 * Returns {@link Rule} for `.toml` handling
 *
 * @public
 */
export const toml = (app: Bud) =>
  app.build
    .makeRule()
    .setType('json')
    .setInclude([app => app.path()])
    .setExclude([app => app.path('@modules')])
    .setTest(({hooks}) => hooks.filter('pattern.html'))
    .setParser({parse: tomlParser.parse})
