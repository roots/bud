/* eslint-disable react/no-unescaped-entities */
import BudCommand from '@roots/bud/cli/commands'
import {Command} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {Box} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'
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
    const bud = await this.makeBud()

    await bud.build.make().catch(this.catch)

    Object.entries(bud.extensions.repository).map(([name, extension]) =>
      (extension.isEnabled()
        ? enabledExtensions
        : disabledExtensions
      ).push([name, extension]),
    )

    const packages = await Promise.all(
      criticalPackages.map(getPackageResults.bind(bud)),
    )

    this.renderStatic(
      <Box flexDirection="column" gap={1} marginY={1}>
        <BuildInfo
          error={this.error}
          name={bud?.label ?? `bud.js`}
          time={timer()}
        />

        <Node />

        <Platform />

        <LabelBox flexDirection="row" label="Mode" value={bud.mode} />

        <Versions packages={packages} />

        <Paths path={bud.path} />

        <Children compilers={bud.children} />

        <DisplayConfigFiles bud={bud} />

        <DisplayEnv bud={bud} />

        <Extensions
          extensions={enabledExtensions}
          label="Enabled extensions"
        />

        <Extensions
          extensions={disabledExtensions}
          label="Disabled extensions"
        />

        <Server bud={bud} />

        <Validate config={bud.build.config} />
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
