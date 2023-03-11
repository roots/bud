import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {globby} from 'globby'
import {bind} from 'helpful-decorators'
import {join} from 'path'

import {Command} from './base.command'

/**
 * Deprecate command
 */
export class Deprecate extends Command {
  /**
   * Command name
   */
  public static label = `@bud deprecate`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `deprecate`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Deprecate a release`,
    examples: [
      [
        `Deprecate release @x.y.z cos u bad`,
        `yarn @bud deprecate x.y.z "my bad"`,
      ],
    ],
  }

  /**
   * Version
   */
  public version = Option.String({name: `version`, required: true})

  /**
   * Reason
   */
  public reason = Option.String({name: `reason`, required: true})

  /**
   * Execute command
   */
  public async execute() {
    const results = await this.getAllPublicPackages()

    await Promise.all(
      results.map(this.formatCommand).map(async command => {
        this.context.stdout.write(`▶ ${command}\n`)
        await this.$(command)
      }),
    )
  }

  /**
   * Get all public packages
   */
  public async getAllPublicPackages() {
    return globby(join(paths.root, `sources`, `@roots`, `*`), {
      onlyDirectories: true,
    }).then(paths =>
      paths.map(path => path.split(`/`).slice(-2).join(`/`)),
    )
  }

  /**
   * Format command for execution
   */
  @bind
  public formatCommand(signifier: string) {
    const command = [`npm`, `deprecate`]
    command.push([signifier, this.version].join(`@`))
    command.push(`"${this.reason}"`)
    return command.join(` `)
  }
}
