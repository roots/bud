import {Option} from '@roots/bud-support/clipanion'

export default (value: boolean) =>
  Option.Boolean(`--dry`, value, {
    description: `Run in dry mode`,
  })
