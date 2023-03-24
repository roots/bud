import type {Factory} from '../index.js'

export const yml: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.yml`))
    .setInclude([() => path()])
    .setUse([`yml`])
