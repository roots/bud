import {Framework} from '@roots/bud-framework'
import {
  json5 as json5Parser,
  toml as tomlParser,
  yaml as yamlParser,
} from '@roots/bud-support'

/**
 * .js rule
 *
 * @public
 */
export const js = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.js'))
    .setInclude(({path}) => [path('@src')])
    .setUse([])

/**
 * .css rule
 *
 * @public
 */
export const css = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.css'))
    .setInclude(({path}) => [path('@src')])
    .setUse([`precss`, `css`])

/**
 * .module.css rule
 *
 * @public
 */
export const cssModule = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.cssModule'))
    .setInclude(({path}) => [path('@src')])
    .setUse([`precss`, `cssModule`])

/**
 * .jpg, .jpeg, .png, .gif rule
 *
 * @public
 */
export const image = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.image'))
    .setInclude(({path}) => [path('@src')])
    .setType('asset/resource')
    .setGenerator(app => ({
      filename: app.store.is('features.hash', true)
        ? 'images/'.concat(app.store.get('hashFormat')).concat('[ext]')
        : 'images/'.concat(app.store.get('fileFormat')).concat('[ext]'),
    }))

/**
 * .webp assets factorry
 *
 * @remarks
 * Returns {@link Rule} for `asset/resource`
 *
 * @public
 */
export const webp = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.webp'))
    .setInclude(({path}) => [path('@src')])
    .setType('asset/resource')
    .setGenerator(app => ({
      filename: app.store.is('features.hash', true)
        ? 'images/'.concat(app.store.get('hashFormat')).concat('[ext]')
        : 'images/'.concat(app.store.get('fileFormat')).concat('[ext]'),
    }))

/**
 * Returns {@link Rule} for `.woff`/`.otf` handling
 * .svg rule
 *
 * @public
 */
export const svg = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.svg'))
    .setInclude(({path}) => [path('@src')])
    .setType('asset/resource')
    .setGenerator(app => ({
      filename: app.store.is('features.hash', true)
        ? 'svg/'.concat(app.store.get('hashFormat')).concat('[ext]')
        : 'svg/'.concat(app.store.get('fileFormat')).concat('[ext]'),
    }))

/**
 * .woff, .woff2, .otf rule
 *
 * @public
 */
export const font = (app: Framework) =>
  app.build
    .makeRule()
    .setType('asset')
    .setTest(({store}) => store.get('patterns.font'))
    .setInclude(({path}) => [path('@src')])
    .setGenerator(app => ({
      filename: app.store.is('features.hash', true)
        ? 'fonts/'.concat(app.store.get('hashFormat')).concat('[ext]')
        : 'fonts/'.concat(app.store.get('fileFormat')).concat('[ext]'),
    }))

/**
 * Returns {@link Rule} for `.jsonc` handling
 *
 * @public
 */
export const json = (app: Framework) =>
  app.build
    .makeRule()
    .setType('json')
    .setInclude(({path}) => [path('@src')])
    .setTest(({store}) => store.get('patterns.json'))
    .setParser({parse: json5Parser.parse})

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 *
 * @public
 */
export const yml = (app: Framework) =>
  app.build
    .makeRule()
    .setType('json')
    .setInclude(({path}) => [path('@src')])
    .setTest(({store}) => store.get('patterns.yml'))
    .setParser({parse: yamlParser.parse})

/**
 * Returns {@link Rule} for `.html` handling
 *
 * @public
 */
export const html = (app: Framework) =>
  app.build
    .makeRule()
    .setInclude(({path}) => [path('@src')])
    .setTest(({store}) => store.get('patterns.html'))
    .setUse([`html`])

/**
 * Returns {@link Rule} for `.csv` handling
 *
 * @public
 */
export const csv = (app: Framework) =>
  app.build
    .makeRule()
    .setInclude(({path}) => [path('@src')])
    .setTest(({store}) => store.get('patterns.csv'))
    .setUse([`csv`])

/**
 * Returns {@link Rule} for `.xml` handling
 *
 * @public
 */
export const xml = (app: Framework) =>
  app.build
    .makeRule()
    .setInclude(({path}) => [path('@src')])
    .setTest(({store}) => store.get('patterns.xml'))
    .setUse([`xml`])

/**
 * Returns {@link Rule} for `.toml` handling
 *
 * @public
 */
export const toml = (app: Framework) =>
  app.build
    .makeRule()
    .setType('json')
    .setInclude(({path}) => [path('@src')])
    .setTest(({store}) => store.get('patterns.html'))
    .setParser({parse: tomlParser.parse})
