import type {Factory} from '../index.js'

export const css: Factory = ({filter, makeRule}) =>
  makeRule()
    .setTest(filter(`pattern.css`))
    .setInclude([({path}) => path(`@src`)])
    .setUse([`precss`, `css`])
