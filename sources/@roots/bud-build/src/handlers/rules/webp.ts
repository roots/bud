import type {Factory} from '../index.js'

export const webp: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.webp`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)
