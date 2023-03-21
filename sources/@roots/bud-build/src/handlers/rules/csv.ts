import type {Factory} from '../index.js'

export const csv: Factory = async ({makeRule, path, filter}) =>
  makeRule()
    .setInclude([path()])
    .setTest(() => filter(`pattern.csv`))
    .setUse([`csv`])
