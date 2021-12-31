import {Framework} from '@roots/bud-framework'
import {
  json5 as json5Parser,
  toml as tomlParser,
  yaml as yamlParser,
} from '@roots/bud-support'

import {Rule} from '../Rule'

/**
 * .js rule
 *
 * @public
 */
export const js = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.js'))
    .setInclude(({path}) => path('src'))
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
    .setInclude(({path}) => path('src'))
    .setUse(({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.css,
    ])

/**
 * .module.css rule
 *
 * @public
 */
export const cssModule = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.cssModule'))
    .setInclude(({path}) => path('src'))
    .setUse(({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.cssModule,
    ])

/**
 * .jpg, .jpeg, .png, .gif rule
 *
 * @public
 */
export const image = (app: Framework): Rule =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.image'))
    .setExclude(({store}) => store.get('patterns.modules'))
    .setType('asset/resource')
    .setGenerator(app => ({
      filename:
        app.store.is('features.hash', true) && app.isProduction
          ? `images/${app.store.get('hashFormat')}[ext]`
          : `images/${app.store.get('fileFormat')}[ext]`,
    }))

/**
 * .svg rule
 *
 * @public
 */
export const svg = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.svg'))
    .setType('asset/resource')
    .setGenerator(app => ({
      filename:
        app.store.is('features.hash', true) && app.isProduction
          ? `svg/${app.store.get('hashFormat')}[ext]`
          : `svg/${app.store.get('fileFormat')}[ext]`,
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
    .setInclude(({path}) => path('src'))
    .setGenerator(app => ({
      filename:
        app.store.is('features.hash', true) && app.isProduction
          ? `fonts/${app.store.get('hashFormat')}[ext]`
          : `fonts/${app.store.get('fileFormat')}[ext]`,
    }))
    .setParser({dataUrlCondition: {maxSize: 50000}})

/**
 * Returns {@link Rule} for `.jsonc` handling
 *
 * @public
 */
export const json = (app: Framework) =>
  app.build
    .makeRule()
    .setType('json')
    .setInclude(({path}) => path('src'))
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
    .setInclude(({path}) => path('src'))
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
    .setInclude(({path}) => path('src'))
    .setTest(({store}) => store.get('patterns.html'))
    .setUse(({build}) => [build.items.html])

/**
 * Returns {@link Rule} for `.csv` handling
 *
 * @public
 */
export const csv = (app: Framework) =>
  app.build
    .makeRule()
    .setInclude(({path}) => path('src'))
    .setTest(({store}) => store.get('patterns.csv'))
    .setUse(({build}) => [build.items.csv])

/**
 * Returns {@link Rule} for `.xml` handling
 *
 * @public
 */
export const xml = (app: Framework) =>
  app.build
    .makeRule()
    .setInclude(({path}) => path('src'))
    .setTest(({store}) => store.get('patterns.xml'))
    .setUse(({build}) => [build.items.xml])

/**
 * Returns {@link Rule} for `.toml` handling
 *
 * @public
 */
export const toml = (app: Framework) =>
  app.build
    .makeRule()
    .setType('json')
    .setInclude(({path}) => path('src'))
    .setTest(({store}) => store.get('patterns.html'))
    .setParser({parse: tomlParser.parse})
