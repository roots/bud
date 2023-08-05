import type {Factory} from '@roots/bud-build/config'

export const entry: Factory<`entry`> = async ({hooks}) =>
  hooks.filter(`build.entry`, {main: {import: [`index`]}})
