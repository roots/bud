import type {Factory} from '@roots/bud-build/config'

export const entry: Factory<`entry`> = async ({hooks}) => {
  const entrypoints = hooks.filter(`build.entry`, {main: {import: [`index`]}})

  return Object.entries(entrypoints).reduce((acc, [key, value]) => {
    value.import = [...new Set(value.import)]
    return {...acc, [key]: value}
  }, {})
}
