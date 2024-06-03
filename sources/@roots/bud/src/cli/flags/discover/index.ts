import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--discover,--discovery`, undefined, {
  description: `Automatically register extensions`,
})
