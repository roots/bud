import type {Factory} from '@roots/bud-build/config'

export const devtool: Factory<`devtool`> = async ({hooks}) =>
  hooks.filter(`build.devtool`, false)
