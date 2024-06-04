import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--ci`, undefined, {
  description: `Run in CI compatibility mode`,
})
