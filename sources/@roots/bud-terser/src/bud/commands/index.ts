import type {Cli} from '@roots/bud/cli/app'

import {BudTerserCommand} from './bud.terser.js'

/**
 * Register bud cli commands
 */
export default async (clipanion: Cli) =>
  clipanion.register(BudTerserCommand)
