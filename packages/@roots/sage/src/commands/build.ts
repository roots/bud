import {Error} from '@roots/bud-dashboard'
import * as source from './source'
import {commands} from '@roots/bud-cli'

export const command = {
  ...commands.build,
  handler: () => {
    try {
      source.preflight()
      source.isStatic() ? source.json() : source.api()
    } catch (error) {
      Error(error.toString(), `Error`)
    }
  },
}
