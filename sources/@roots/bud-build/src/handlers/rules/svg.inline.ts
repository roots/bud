import type {Factory} from '../index.js'

export const inlineSvg: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setResourceQuery(/inline/)
    .setType(`asset/inline`)
