import type {Factory} from '../index.js'

export const js: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.js`))
    .setInclude([() => path(`@src`)])
    .setUse([])
