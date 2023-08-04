import type {Factory} from '@roots/bud-build/config'

export const bail: Factory<'bail'> = async ({hooks, isProduction}) =>
  hooks.filter(`build.bail`, isProduction)
