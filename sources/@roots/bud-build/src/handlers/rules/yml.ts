import type {Factory} from '../index.js'

export const yml: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(filter(`pattern.yml`))
    .setUse([`yml`])
