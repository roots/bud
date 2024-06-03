/* eslint-disable react/no-unescaped-entities */
import BudCommand from '@roots/bud/cli/commands'
import {LabelBox} from '@roots/bud/cli/components/LabelBox'
import {Extension} from '@roots/bud-framework/extension'
import chalk from '@roots/bud-support/chalk'
import {Command} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box} from '@roots/bud-support/ink'

import DisplayConfigFiles from '../config/displayConfigFiles.js'
import DisplayEnv from '../env/displayEnv.js'
import {BuildInfo} from './buildInfo.js'
import {Children} from './children.js'
import {Extensions} from './extensions.js'
import {Node} from './node.js'
import {Paths} from './paths.js'
import {Platform} from './platform.js'
import {Server} from './server.js'
import {Validate} from './validate.js'
import {criticalPackages, getPackageResults, Versions} from './versions.js'

/**
 * bud doctor command
 */
export default class DoctorCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`doctor`]]

  /**
   * {@link BudCommand.usage}
   */
  public static override usage = Command.Usage({
    category: `debug`,
    description: `Check project for common errors`,
    details: `\
The \`bud doctor\` command will:

1. validate the \`production\` configuration with \`webpack\`

2. check bud.js related \`dependencies\` and \`devDependencies\` are the version bud.js expects.`,
    examples: [
      [`Check project for common configuration issues`, `$0 doctor`],
    ],
  })

  public error: Error | string

  /**
   * Error handler override
   */
  @bind
  public override async catch(error?: Error | string) {
    this.error = error
  }

  /**
   * Silent flag override
   */
  public override silent = true

  /**
   * Execute command
   */
  public override async execute() {
    const enabledExtensions = []
    const disabledExtensions = []

    const timer = this.makeTimer()
    await this.makeBud()

    await this.bud?.build.make().catch(this.catch)

    Object.entries(this.bud?.extensions.repository).map(
      ([name, extension]) => {
        if (`isEnabled` in extension && extension.isEnabled()) {
          return enabledExtensions.push([name, extension])
        }

        if (extension instanceof Extension) {
          return disabledExtensions.push([name, extension])
        }

        if (!(`label` in extension)) {
          name = `${name} ${chalk.yellow(
            `* consider giving this extension a \`label\` to make it easier to identify`,
          )}`
        }
        enabledExtensions.push([name, extension])
      },
    )

    const packages = await Promise.all(
      criticalPackages.map(getPackageResults.bind(this.bud)),
    )

    this.renderStatic(
      <Box flexDirection="column" gap={1} marginY={1}>
        <BuildInfo
          error={this.error}
          name={this.bud?.label ?? `bud.js`}
          time={timer()}
        />

        <Node />

        <Platform />

        <LabelBox
          flexDirection="row"
          label="Mode"
          value={this.bud?.mode}
        />

        <Versions packages={packages} />

        <Paths path={this.bud?.path} />

        <Children compilers={this.bud?.children} />

        <DisplayConfigFiles bud={this.bud} />

        <DisplayEnv bud={this.bud} />

        <Extensions
          extensions={enabledExtensions}
          label="Enabled extensions"
        />

        <Extensions
          extensions={disabledExtensions}
          label="Disabled extensions"
        />

        <Server bud={this.bud} />

        <Validate config={this.bud?.build.config} />
      </Box>,
    )
  }

  public makeTimer = () => {
    const start = process.hrtime()

    return (): string => {
      const end = process.hrtime(start)
      return (end[0] + end[1] / 1e9).toFixed(2)
    }
  }
}
