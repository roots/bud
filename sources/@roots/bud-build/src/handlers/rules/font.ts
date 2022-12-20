import type {Factory} from '../index.js'

export const font: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setType(`asset`)
    .setTest(filter(`pattern.font`))
    .setInclude([() => path(`@src`)])
