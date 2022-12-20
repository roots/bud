import type {Factory} from './index.js'

export const name: Factory<`name`> = async ({hooks, label}) =>
  hooks.filter(`build.name`, label)
