import type {Factory} from '@roots/bud-build/registry'

const webp: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.webp`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)

export {webp as default}
