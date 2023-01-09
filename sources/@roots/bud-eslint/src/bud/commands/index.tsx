import {BudEslintCommand} from './bud.eslint.command.js'

/**
 * Register bud cli commands
 */
export default async clipanion => clipanion.register(BudEslintCommand)
