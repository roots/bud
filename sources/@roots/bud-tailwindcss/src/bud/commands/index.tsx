import type {Cli} from '@roots/bud-support/clipanion'
import {BudTailwindCommand} from '@roots/bud-tailwindcss/bud/commands/tailwindcss'

/**
 * Register bud cli command
 */
export default async (cli: Cli) => cli.register(BudTailwindCommand)
