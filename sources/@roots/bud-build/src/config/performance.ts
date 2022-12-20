import type {Factory} from './index.js'

export const performance: Factory<`performance`> = async ({hooks}) =>
  hooks.filter(`build.performance`, {hints: false})
