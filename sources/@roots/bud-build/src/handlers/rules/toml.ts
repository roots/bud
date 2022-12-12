import * as tomlParser from 'toml'

import type {Factory} from '../index.js'

export const toml: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setType(`json`)
    .setInclude([() => path()])
    .setTest(() => filter(`pattern.toml`))
    .setParser({parse: tomlParser.parse})
