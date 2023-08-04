import type {Factory} from '@roots/bud-build/registry'

const css: Factory = async ({filter, makeRule}) =>
  makeRule()
    .setTest(filter(`pattern.css`))
    .setInclude([({path}) => path(`@src`)])
    .setUse([`precss`, `css`])

export {css as default}
