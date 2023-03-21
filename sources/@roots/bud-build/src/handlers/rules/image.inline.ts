import type {Factory} from '../index.js'

export const inlineImage: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.image`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/inline`)
    .setResourceQuery(/inline/)
