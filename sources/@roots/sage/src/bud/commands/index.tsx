import type {Cli} from '@roots/bud-support/clipanion'

import {BudSageCommand} from './bud.sage.add.js'

/**
 * Register bud cli commands
 */
export default async (clipanion: Cli) => clipanion.register(BudSageCommand)
