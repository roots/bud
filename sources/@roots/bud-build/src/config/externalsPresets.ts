import type {Factory} from '@roots/bud-build/config'

export const externalsPresets: Factory<`externalsPresets`> = async ({hooks}) =>
  hooks.filter(`build.externalsPresets`, undefined)
