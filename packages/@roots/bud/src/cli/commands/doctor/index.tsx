import {flags} from '@oclif/command'
import type Parser from '@oclif/parser'
import {noop} from 'lodash'

import Bud from '../../../Bud'
import {Command} from '../../Command'
import {Runner} from '../../Runner'

const EXIT = process.env.JEST_WORKER_ID ? noop : process.exit

interface Doctor extends Command {
  hasMissingPeers(): boolean
  getMissingPeers(): {name: string}[]
  handleMissingPeers(): Doctor
  run(): Promise<void>
}

/**
 * `$ bud doctor` command class
 *
 * @public
 */
class Doctor extends Command {
  /**
   * {@link Command.description}
   */
  public static description = 'Help diagnose issues with Bud'

  /**
   * {@link Command.examples}
   */
  public static examples = [`$ bud doctor`]

  /**
   * Command Flags
   *
   * {@link Command.flags}
   */
  public static flags = {
    help: flags.help({char: 'h'}),
    target: flags.string({
      char: 't',
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
  }

  public static args = []

  /**
   * {@link Bud} application instance
   */
  public app: Bud

  /**
   * Oclif parser
   */
  public cli: Parser.Output<
    {
      help: void
      target: string[]
    },
    any[]
  >

  /**
   * {@link Bud.Mode} compilation mode
   */
  public mode = 'production'

  /**
   * Returns true if there are missing peer dependencies
   */
  public hasMissingPeers(): boolean {
    return this.getMissingPeers()?.length > 0
  }

  /**
   * Returns an array of missing peer dependencies
   */
  public getMissingPeers(): {name: string}[] {
    return this.app.project.has('peers')
      ? this.app.project
          .getValues('peers')
          ?.filter(
            (dep: {name: string}) =>
              !this.app.project.hasPeerDependency(dep.name),
          )
      : []
  }

  /**
   * Show feedback on command operation to user
   */
  public displayFeedback(missing: {name: string}[]): void {
    missing.length < 1
      ? this.app.dashboard.render(
          'All checks are O.K.',
          'bud doctor',
        )
      : this.app.dashboard.render(
          missing?.map(({name}) => `❌ ${name}`),
          'Missing dependencies',
        )
  }

  /**
   * Called at the end of {@link run}
   */
  public done() {
    this.app.close(EXIT)
  }

  /**
   * {@link Command.run}
   */
  public async run(): Promise<void> {
    /**
     * Basic setup
     */
    this.cli = this.parse(Doctor)
    new Runner(this.cli)

    this.displayFeedback(this.getMissingPeers())
    this.done()
  }
}

export default Doctor
