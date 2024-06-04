import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--reload`, undefined, {
  description: `Reload browser on unrecoverable errors`,
})
