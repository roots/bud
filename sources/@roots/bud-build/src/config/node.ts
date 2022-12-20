import type {Factory} from './index.js'

export const node: Factory<`node`> = async ({hooks}) =>
  hooks.filter(`build.node`, false)
