import type {Factory} from '../index.js'

export const csv: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([path()])
    .setTest(() => filter(`pattern.csv`))
    .setUse([`csv`])
