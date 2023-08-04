import type {Factory} from '@roots/bud-build/registry'

import json5 from '@roots/bud-support/json5'

const json: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setType(`json`)
    .setInclude([() => path()])
    .setTest(filter(`pattern.json`))
    .setParser({
      parse: json5.parse,
    })

export {json as default}
