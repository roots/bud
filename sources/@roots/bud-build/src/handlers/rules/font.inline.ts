import type {Factory} from '../index.js'

export const inlineFont: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.font`))
    .setInclude([() => path(`@src`)])
    .setResourceQuery(/inline/)
    .setType(`asset/inline`)
