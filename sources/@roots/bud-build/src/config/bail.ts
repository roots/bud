import type {Factory} from '@roots/bud-build/config'

export const bail: Factory<'bail'> = async ({
  context,
  hooks,
  isProduction,
}) => hooks.filter(`build.bail`, isProduction && !context.ignoreErrors)
