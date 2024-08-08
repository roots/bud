import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--entrypoints`, undefined, {
  description: `Generate an entrypoints manifest`,
})
