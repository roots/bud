import type {Factory} from '@roots/bud-build/registry'

const yml: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.yml`))
    .setInclude([() => path()])
    .setUse([`yml`])

export {yml as default}
