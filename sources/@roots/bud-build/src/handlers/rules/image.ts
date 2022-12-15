import type {Factory} from '../index.js'

export const image: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.image`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)
