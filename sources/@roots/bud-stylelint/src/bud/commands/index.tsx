import {BudStylelintCommand} from './bud.stylelint.command.js'

/**
 * Register bud cli commands
 *
 * @public
 */
export default async clipanion => clipanion.register(BudStylelintCommand)
