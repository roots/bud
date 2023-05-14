import type {Cli} from '@roots/bud-support/clipanion'

import {BudTailwindCommand} from './tailwindcss/index.js'

/**
 * Register bud cli command
 */
export default async (cli: Cli) => cli.register(BudTailwindCommand)
