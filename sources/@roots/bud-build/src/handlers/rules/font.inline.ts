import type {Factory} from '../index.js'

export const inlineFont: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.font`))
    .setInclude([() => path(`@src`)])
    .setResourceQuery(/inline/)
    .setType(`asset/inline`)
