import type {Cli} from '@roots/bud-support/clipanion'

import {BudTSCheckCommand} from './bud.ts.check.command.js'
import {BudTSCCommand} from './bud.ts.command.js'

/**
 * Register bud cli commands
 */
export default async (clipanion: Cli) => {
  clipanion.register(BudTSCCommand)
  clipanion.register(BudTSCheckCommand)
}
