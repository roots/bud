import type {Factory} from './index.js'

export const bail: Factory<'bail'> = async ({hooks, isProduction}) =>
  hooks.filter(`build.bail`, isProduction)
