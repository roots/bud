import type {Factory} from '../index.js'

export const css: Factory = async ({filter, makeRule}) =>
  makeRule()
    .setTest(filter(`pattern.css`))
    .setInclude([({path}) => path(`@src`)])
    .setUse([`precss`, `css`])
