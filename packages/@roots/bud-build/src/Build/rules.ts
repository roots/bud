import {Framework} from '@roots/bud-framework'
import {
  json5 as json5Parser,
  toml as tomlParser,
  yaml as yamlParser,
} from '@roots/bud-support'

import {Rule} from '../Rule'

/**
 * Returns {@link Rule} for `asset/resource`
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
 * Returns {@link Rule} for `.woff`/`.otf` handling
 *
 * @public
 */
export const font = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.font'))
    .setExclude(({store}) => store.get('patterns.modules'))
    .setType('asset')
    .setGenerator(app => ({
      filename:
        app.store.is('features.hash', true) && app.isProduction
          ? `fonts/${app.store.get('hashFormat')}[ext]`
          : `fonts/${app.store.get('fileFormat')}[ext]`,
    }))
    .setParser({
      dataUrlCondition: {
        maxSize: 50000,
      },
    })

/**
 * Returns {@link Rule} for `.svg` handling
 *
 * @public
 */
export const svg = (app: Framework) =>
  app.build
    .makeRule()
    .setTest(({store}) => store.get('patterns.image'))
    .setExclude(({store}) => store.get('patterns.modules'))
    .setType('asset/resource')
    .setGenerator(app => ({
      filename:
        app.store.is('features.hash', true) && app.isProduction
          ? `svg/${app.store.get('hashFormat')}[ext]`
          : `svg/${app.store.get('fileFormat')}[ext]`,
    }))

/**
 * Returns {@link Rule} for `.html` handling
 *
 * @public
 */
export const html = (app: Framework) =>
  new Rule(app, {
    test: ({store}) => store.get('patterns.html'),
    use: ({build}) => [build.items.html],
  })

/**
 * Returns {@link Rule} for `.csv` handling
 *
 * @public
 */
export const csv = (app: Framework) =>
  new Rule(app, {
    test: ({store}) => store.get('patterns.csv'),
    use: ({build}) => [build.items.csv],
  })

/**
 * Returns {@link Rule} for `.xml` handling
 *
 * @public
 */
export const xml = (app: Framework) =>
  new Rule(app, {
    test: ({store}) => store.get('patterns.xml'),
    use: ({build}) => [build.items.xml],
  })

/**
 * Returns {@link Rule} for `.toml` handling
 *
 * @public
 */
export const toml = (app: Framework) =>
  new Rule(app, {
    test: ({store}) => store.get('patterns.toml'),
    type: () => 'json',
    parser: () => ({
      parse: tomlParser.parse,
    }),
  })

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 *
 * @public
 */
export const yml = (app: Framework) =>
  new Rule(app, {
    test: ({store}) => store.get('patterns.yml'),
    type: 'json',
    parser: () => ({
      parse: yamlParser.parse,
    }),
  })

/**
 * Returns {@link Rule} for `.jsonc` handling
 *
 * @public
 */
export const json5 = (app: Framework) =>
  new Rule(app, {
    test: ({store}) => store.get('patterns.json5'),
    type: 'json',
    parser: () => ({
      parse: json5Parser.parse,
    }),
  })

/**
 * Returns {@link Rule} for `.css` handling
 *
 * @public
 */
export const css = (app: Framework) =>
  new Rule(app, {
    test: ({store}) => store.get('patterns.css'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.css,
    ],
  })

/**
 * Returns {@link Rule} for `.js` handling
 *
 * @public
 */
export const js = (app: Framework) =>
  app.build.makeRule({
    test: ({store}) => store.get('patterns.js'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: () => [],
  })
