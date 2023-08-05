import type {Bud} from '@roots/bud-framework'

const isMjs = (filter: Bud[`hooks`][`filter`]) =>
  filter(`build.experiments`)?.outputModule === true

export {isMjs as default}
