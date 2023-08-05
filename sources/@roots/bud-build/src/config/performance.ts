import type {Factory} from '@roots/bud-build/config'

export const performance: Factory<`performance`> = async ({hooks}) =>
  hooks.filter(`build.performance`, false)
