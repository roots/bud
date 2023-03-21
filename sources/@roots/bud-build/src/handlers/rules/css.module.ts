import type {Factory} from '../index.js'

export const cssModule: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.cssModule`))
    .setInclude([() => path(`@src`)])
    .setUse([`precss`, `cssModule`])
