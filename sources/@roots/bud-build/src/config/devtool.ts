import type {Factory} from './index.js'

export const devtool: Factory<`devtool`> = async ({hooks}) =>
  hooks.filter(`build.devtool`, false)
