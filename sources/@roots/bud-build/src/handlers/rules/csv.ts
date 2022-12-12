import type {Factory} from '../index.js'

export const csv: Factory = ({makeRule, path, filter}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(() => filter(`pattern.csv`))
    .setUse([`csv`])
