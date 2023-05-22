import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--log`, undefined, {
  description: `Enable logging`,
  hidden: true,
})
