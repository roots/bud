import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--dry`, true, {
  description: `run in dry mode`,
})
