import {Option} from '@roots/bud-support/clipanion'

export default value =>
  Option.Boolean(`--dry`, value, {
    description: `run in dry mode`,
  })
