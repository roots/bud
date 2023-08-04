import type {Factory} from '@roots/bud-build/registry'

import tomlParser from '@roots/bud-support/toml'

const toml: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setType(`json`)
    .setInclude([() => path()])
    .setTest(() => filter(`pattern.toml`))
    .setParser({
      parse: tomlParser.parse,
    })

export {toml as default}
