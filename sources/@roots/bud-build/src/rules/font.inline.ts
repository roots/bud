import type {Factory} from '@roots/bud-build/registry'

const inlineFont: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.font`))
    .setInclude([() => path(`@src`)])
    .setResourceQuery(/inline/)
    .setType(`asset/inline`)

export {inlineFont as default}
