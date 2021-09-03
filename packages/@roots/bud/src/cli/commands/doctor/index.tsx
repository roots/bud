import {flags} from '@oclif/command'
import type Parser from '@oclif/parser'
import {noop} from 'lodash'

import {Framework} from '../../..'
import {Command} from '../../Command'
import {Runner} from '../../Runner'

const EXIT = process.env.JEST_WORKER_ID ? noop : process.exit

/**
 * @class DoctorCommand
 * @extends Command
 * @classdesc @oclif/Command instance for `doctor` command
 * @example $ bud doctor
 */
interface Doctor extends Command {
  hasMissingPeers(): boolean
  getMissingPeers(): {name: string}[]
  handleMissingPeers(): Doctor
  run(): Promise<void>
}

class Doctor extends Command {
  /**
   * Command description
   *
   * @var {Command.description} Doctor.description
   */
  public static description = 'Help diagnose issues with Bud'

  /**
   * Command Examples
   *
   * @var {Command.examples} Doctor.examples
   */
  public static examples = [`$ bud doctor`]

  /**
   * Command Flags
   *
   * @var {Command.flags} Doctor.flags
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
   * Application instance
   *
   * @var {Framework} Doctor.app
   */
  public app: Framework
  public cli: Parser.Output<
    {
      help: void
      target: string[]
    },
    any[]
  >

  /**
   * Mode to run command in
   *
   * @var {Framework.Mode} mode
   */
  public mode = 'production'

  /**
   * Returns true if there are missing peer dependencies
   *
   * @returns {Promise<boolean>}
   */
  public hasMissingPeers(): boolean {
    return this.getMissingPeers()?.length > 0
  }

  /**
   * Returns an array of missing peer dependencies
   *
   * @return {Promise<any[]>} missing peers
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

  public done() {
    this.app.close(EXIT)
  }

  /**
   * Run command
   *
   * @return {Promise<void>} command result
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
