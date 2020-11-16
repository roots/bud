import {DefinePlugin as Plugin} from 'webpack'
import type {Extension} from '@roots/bud-typings'

export const make: Extension.Make = opt =>
  new Plugin(opt.getStore())

export const when: Extension.When = (_bud, opts) =>
  opts.getEntries()?.length > 0

export const options: Extension.Options = bud =>
  bud.env
    .getEntries()
    .filter(([k]: [string, unknown]) => !k.includes('SECRET'))
    .reduce((a, [k, v]) => ({...a, [k]: v}), {})
