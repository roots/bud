import type {Factory} from '../index.js'

export const svg: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)
