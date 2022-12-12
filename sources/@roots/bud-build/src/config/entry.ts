import type {Factory} from './index.js'

export const entry: Factory<`entry`> = async ({hooks}) =>
  hooks.filter(`build.entry`, {main: {import: [`index`]}})
