import {flags} from '@oclif/command'
import type Parser from '@oclif/parser'

import {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Doctor extends Command {
  public static id = 'doctor'
  public static title = 'doctor'
  public static description = 'diagnose issues'
  public static examples = [`$ bud doctor`]

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

  public app: Bud

  public cli: Parser.Output<
    {
      help: void
      target: string[]
    },
    any[]
  >

  public hasMissingPeers(): boolean {
    return this.getMissingPeers()?.length > 0
  }

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
          [
            ...missing?.map(({name}) => `❌ ${name}`),
            '\n',
            'Run `bud init` to install missing dependencies',
          ],
          'Missing dependencies',
        )
  }

  public async run(): Promise<void> {
    const runner = new Runner(this.parse(Doctor))
    await runner.initialize()
    this.app = runner.app

    this.displayFeedback(this.getMissingPeers())

    process.exit()
  }
}
