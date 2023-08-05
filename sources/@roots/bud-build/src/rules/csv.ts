import type {Factory} from '@roots/bud-build/registry'

const csv: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([path()])
    .setTest(() => filter(`pattern.csv`))
    .setUse([`csv`])

export {csv as default}
