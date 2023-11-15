import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--browserslist-update`, undefined, {
  description: `Check for browserslist db updates at regular intervals.`,
})
