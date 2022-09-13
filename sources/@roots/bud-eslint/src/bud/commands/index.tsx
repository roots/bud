import {BudEslintCommand} from './bud.eslint.command.js'

/**
 * Register bud cli commands
 *
 * @public
 */
export default async clipanion => clipanion.register(BudEslintCommand)
