import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--dashboard.assets`, undefined, {
  description: `Render compiled assets in dashboard`,
})
