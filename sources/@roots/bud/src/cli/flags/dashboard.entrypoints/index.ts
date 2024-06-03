import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--dashboard.entrypoints`, undefined, {
  description: `Render compiled entrypoints in dashboard`,
})
