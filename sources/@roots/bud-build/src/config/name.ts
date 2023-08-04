import type {Factory} from '@roots/bud-build/config'

export const name: Factory<`name`> = async ({hooks, label}) =>
  hooks.filter(`build.name`, label)
