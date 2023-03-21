import type {Factory} from '../index.js'

export const xml: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(() => filter(`pattern.xml`))
    .setUse([`xml`])
