import type {Factory} from '@roots/bud-build/registry'

const font: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setType(`asset`)
    .setTest(filter(`pattern.font`))
    .setInclude([() => path(`@src`)])

export {font as default}
