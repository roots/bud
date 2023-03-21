import type {Factory} from '../index.js'

export const js: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.js`))
    .setInclude([() => path(`@src`)])
    .setUse([])
