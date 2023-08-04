import type {Factory} from '@roots/bud-build/registry'

const inlineImage: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.image`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/inline`)
    .setResourceQuery(/inline/)

export {inlineImage as default}
