import {BudTSCheckCommand} from './bud.ts.check.command.js'
import {BudTSCCommand} from './bud.tsc.command.js'

/**
 * Register bud cli commands
 *
 * @public
 */
export default async clipanion => {
  clipanion.register(BudTSCCommand)
  clipanion.register(BudTSCheckCommand)
}
