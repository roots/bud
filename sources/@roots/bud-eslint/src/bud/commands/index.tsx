import type {Cli} from '@roots/bud-support/clipanion'

import {BudEslintCommand} from './bud.eslint.command.js'

/**
 * Register bud cli commands
 */
export default async (clipanion: Cli) =>
  clipanion.register(BudEslintCommand)
