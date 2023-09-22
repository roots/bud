import type {Factory} from '@roots/bud-build/config'

export const externalsType: Factory<`externalsType`> = async ({hooks}) =>
hooks.filter(`build.externalsType`, undefined)
