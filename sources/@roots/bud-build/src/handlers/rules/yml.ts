import type {Factory} from '../index.js'

export const yml: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(filter(`pattern.yml`))
    .setUse([`yml`])
