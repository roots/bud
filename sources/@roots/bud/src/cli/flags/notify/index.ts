import {platform} from 'node:os'

import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--notify`, platform() === `darwin`, {
  description: `Enable notification (default on macOS, experimental on other platforms)`,
})
