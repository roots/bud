import type {Factory} from '../index.js'

export const html: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(filter(`pattern.html`))
    .setUse([`html`])
