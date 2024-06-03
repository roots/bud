import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--dashboard.server`, undefined, {
  description: `Render server information in dashboard`,
})
