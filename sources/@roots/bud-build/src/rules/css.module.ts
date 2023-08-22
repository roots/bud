import type {Factory} from '@roots/bud-build/registry'

const cssModule: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.cssModule`))
    .setInclude([() => path(`@src`)])
    .setUse([`precss`, `css-module`])

export {cssModule as default}
