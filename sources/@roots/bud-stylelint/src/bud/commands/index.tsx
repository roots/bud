import type {Cli} from '@roots/bud/cli/app'

import {BudStylelintCommand} from './bud.stylelint.command.js'

/**
 * Register bud cli commands
 */
export default async (clipanion: Cli) =>
  clipanion.register(BudStylelintCommand)
