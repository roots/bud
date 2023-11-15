import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--update-browserslist`, true, {
  description: `Check for browserslist db updates at regular intervals.`,
})
