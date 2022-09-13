import {BudPrettierCommand} from './bud.prettier.command.js'

/**
 * Register bud cli commands
 *
 * @public
 */
export default async clipanion => clipanion.register(BudPrettierCommand)
