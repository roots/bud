import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--entrypoints.html`, undefined, {
  description: `Output html partial containing entrypoint scripts and styles`,
})
