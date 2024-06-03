import {Option} from '@roots/bud-support/clipanion'

export default (value?: boolean) =>
  Option.Boolean(`--silent,-s`, value, {
    description: `silence stdout`,
  })
