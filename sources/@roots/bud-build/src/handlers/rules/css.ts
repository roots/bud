import type {Factory} from '../index.js'

export const css: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.css`))
    .setInclude([() => path(`@src`)])
    .setUse([`precss`, `css`])
