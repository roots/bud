import type {Factory} from '@roots/bud-build/registry'

const svg: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)

export {svg as default}
