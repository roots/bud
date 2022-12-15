import * as json5Parser from 'json5'

import type {Factory} from '../index.js'

export const json: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setType(`json`)
    .setInclude([() => path()])
    .setTest(filter(`pattern.json`))
    .setParser({parse: json5Parser.parse})
