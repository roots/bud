import type {Bud} from '@roots/bud-framework'

export const isMjs = (filter: Bud[`hooks`][`filter`]) =>
  filter(`build.experiments`)?.outputModule === true
