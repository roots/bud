/**
 * @module @roots/bud-build
 */

import {Rule} from '../Rule'

const json5Parser = require('json5')
const tomlParser = require('toml')
const yamlParser = require('yamljs')

/**
 * @exports image
 */
export const image = () =>
  new Rule({
    test: ({store}) => store.get('patterns.image'),
    exclude: ({store}) => store.get('patterns.modules'),
    type: 'asset/resource',
    generator: {
      filename: 'assets/[hash][ext][query]',
    },
  })

/**
 * @exports font
 */
export const font = () =>
  new Rule({
    test: ({store}) => store.get('patterns.font'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({build}) => [build.items['resolveUrl']],
  })

/**
 * @exports md
 */
export const md = () =>
  new Rule({
    test: ({store}) => store.get('patterns.md'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({build}) => [build.items.html, build.items.md],
  })

/**
 * @exports svg
 */
export const svg = () =>
  new Rule({
    test: ({store}) => store.get('patterns.svg'),
    exclude: ({store}) => store.get('patterns.modules'),
    type: 'asset/resource',
    generator: {
      filename: 'assets/[hash][ext][query]',
    },
  })

/**
 * @exports html
 */
export const html = () =>
  new Rule({
    test: ({store}) => store.get('patterns.html'),
    use: ({build}) => [build.items.html],
  })

/**
 * @exports csv
 */
export const csv = () =>
  new Rule({
    test: ({store}) => store.get('patterns.csv'),
    use: ({build}) => [build.items.csv],
  })

/**
 * @exports xml
 */
export const xml = () =>
  new Rule({
    test: ({store}) => store.get('patterns.xml'),
    use: ({build}) => [build.items.xml],
  })

/**
 * @exports toml
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
 * @exports yml
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
 * @exports json5
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
 * @exports css
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
 * @exports js
 */
export const js: () => Rule = () =>
  new Rule({
    test: ({store}) => store.get('patterns.js'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: [],
  })
