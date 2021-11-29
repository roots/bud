import {
  json5 as json5Parser,
  toml as tomlParser,
  yaml as yamlParser,
} from '@roots/bud-support'

import {Rule} from '../Rule'

/**
 * Returns {@link Rule} for `asset/resource`
 */
export const image = () =>
  new Rule({
    test: ({store}) => store.get('patterns.image'),
    exclude: ({store}) => store.get('patterns.modules'),
    type: 'asset/resource',
    generator: app => ({
      filename: `assets/${
        app.store.is('features.hash', true) && app.isProduction
          ? app.store.get('hashFormat')
          : app.store.get('fileFormat')
      }[ext]`,
    }),
  })

/**
 * Returns {@link Rule} for `.woff`/`.otf` handling
 */
export const font = () =>
  new Rule({
    test: ({store}) => store.get('patterns.font'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({build}) => [build.items['resolve-url']],
  })

/**
 * Returns {@link Rule} for `.svg` handling
 */
export const svg = () =>
  new Rule({
    test: ({store}) => store.get('patterns.svg'),
    exclude: ({store}) => store.get('patterns.modules'),
    type: 'asset/resource',
    generator: app => ({
      filename: `assets/${
        app.store.is('features.hash', true) && app.isProduction
          ? app.store.get('hashFormat')
          : app.store.get('fileFormat')
      }[ext]`,
    }),
  })

/**
 * Returns {@link Rule} for `.html` handling
 */
export const html = () =>
  new Rule({
    test: ({store}) => store.get('patterns.html'),
    use: ({build}) => [build.items.html],
  })

/**
 * Returns {@link Rule} for `.csv` handling
 */
export const csv = () =>
  new Rule({
    test: ({store}) => store.get('patterns.csv'),
    use: ({build}) => [build.items.csv],
  })

/**
 * Returns {@link Rule} for `.xml` handling
 */
export const xml = () =>
  new Rule({
    test: ({store}) => store.get('patterns.xml'),
    use: ({build}) => [build.items.xml],
  })

/**
 * Returns {@link Rule} for `.toml` handling
 */
export const toml: () => Rule = () =>
  new Rule({
    test: ({store}) => store.get('patterns.toml'),
    type: () => 'json',
    parser: () => ({
      parse: tomlParser.parse,
    }),
  })

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 */
export const yml: () => Rule = () =>
  new Rule({
    test: ({store}) => store.get('patterns.yml'),
    type: 'json',
    parser: () => ({
      parse: yamlParser.parse,
    }),
  })

/**
 * Returns {@link Rule} for `.jsonc` handling
 */
export const json5: () => Rule = () =>
  new Rule({
    test: ({store}) => store.get('patterns.json5'),
    type: 'json',
    parser: () => ({
      parse: json5Parser.parse,
    }),
  })

/**
 * Returns {@link Rule} for `.css` handling
 */
export const css: () => Rule = () =>
  new Rule({
    test: ({store}) => store.get('patterns.css'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.css,
    ],
  })

/**
 * Returns {@link Rule} for `.js` handling
 */
export const js: () => Rule = () =>
  new Rule({
    test: ({store}) => store.get('patterns.js'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: () => [],
  })
