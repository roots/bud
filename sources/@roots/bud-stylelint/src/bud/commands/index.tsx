import {BudStylelintCommand} from './bud.stylelint.command.js'

/**
 * Register bud cli commands
 */
export default async clipanion => clipanion.register(BudStylelintCommand)
