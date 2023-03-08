import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * bud lint exports
 */
export class LintExports extends Command {
  /**
   * Command name
   */
  public static label = `@bud lint exports`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `lint`, `exports`],
  ]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `lint published package module exports`,
    examples: [
      [`lint package.json module exports`, `yarn @bud lint exports`],
    ],
  }

  /**
   * Execute command
   */
  public async execute() {
    await this.cli.run([`workspaces`, `foreach`, `--no-private`, `exec`, `yarn`, `run`, `package-check`])
  }
}
