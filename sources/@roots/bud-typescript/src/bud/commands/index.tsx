import {BudTSCheckCommand} from './bud.ts.check.command.js'

/**
 * Register bud cli commands
 *
 * @public
 */
export default async clipanion => clipanion.register(BudTSCheckCommand)
