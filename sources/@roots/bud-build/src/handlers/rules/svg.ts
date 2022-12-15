import type {Factory} from '../index.js'

export const svg: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)
