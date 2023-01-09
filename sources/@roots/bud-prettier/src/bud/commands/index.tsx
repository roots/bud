import {BudPrettierCommand} from './bud.prettier.command.js'

/**
 * Register bud cli commands
 */
export default async clipanion => clipanion.register(BudPrettierCommand)
