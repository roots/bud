import json5Parser from 'json5'
import tomlParser from 'toml'
import yamlParser from 'yamljs'

import {Rule} from '../Rule'

export const image = () =>
  new Rule({
    test: ({store}) => store.get('patterns.image'),
    exclude: ({store}) => store.get('patterns.modules'),
    type: 'asset/resource',
    generator: {
      filename: 'assets/[hash][ext][query]',
    },
  })

export const font = () =>
  new Rule({
    test: ({store}) => store.get('patterns.font'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({build}) => [build.items['resolveUrl']],
  })

export const md = () =>
  new Rule({
    test: ({store}) => store.get('patterns.md'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({build}) => [build.items.html, build.items.md],
  })

export const svg = () =>
  new Rule({
    test: ({store}) => store.get('patterns.svg'),
    exclude: ({store}) => store.get('patterns.modules'),
    type: 'asset/resource',
    generator: {
      filename: 'assets/[hash][ext][query]',
    },
  })

export const html = () =>
  new Rule({
    test: ({store}) => store.get('patterns.html'),
    use: ({build}) => [build.items.html],
  })

export const csv = () =>
  new Rule({
    test: ({store}) => store.get('patterns.csv'),
    use: ({build}) => [build.items.csv],
  })

export const xml = () =>
  new Rule({
    test: ({store}) => store.get('patterns.xml'),
    use: ({build}) => [build.items.xml],
  })

export const toml = () =>
  new Rule({
    test: ({store}) => store.get('patterns.toml'),
    type: () => 'json',
    parser: () => ({
      parse: tomlParser.parse,
    }),
  })

export const yml = () =>
  new Rule({
    test: ({store}) => store.get('patterns.yml'),
    type: 'json',
    parser: () => ({
      parse: yamlParser.parse,
    }),
  })

export const json5 = () =>
  new Rule({
    test: ({store}) => store.get('patterns.json5'),
    type: 'json',
    parser: () => ({
      parse: json5Parser.parse,
    }),
  })

export const css = () =>
  new Rule({
    test: ({store}) => store.get('patterns.css'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: ({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.css,
    ],
  })

export const js = () =>
  new Rule({
    test: ({store}) => store.get('patterns.js'),
    exclude: ({store}) => store.get('patterns.modules'),
    use: [],
  })
