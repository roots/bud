import type {Factory} from '@roots/bud-build/config'

export const node: Factory<`node`> = async ({hooks}) =>
  hooks.filter(`build.node`, false)
