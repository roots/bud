import type {Factory} from '@roots/bud-build/registry'

const js: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.js`))
    .setInclude([() => path(`@src`)])
    .setResolve({
      fullySpecified: false,
    })

export {js as default}
