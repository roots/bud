import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--force,--flush`, undefined, {
  description: `Force clearing all caches`,
})
