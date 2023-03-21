import json5 from '@roots/bud-support/json5'

import type {Factory} from '../index.js'

export const json: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setType(`json`)
    .setInclude([() => path()])
    .setTest(filter(`pattern.json`))
    .setParser({parse: json5.parse})
