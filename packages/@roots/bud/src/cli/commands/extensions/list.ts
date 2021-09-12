import type Bud from '../../../Bud'
import Build from '../../Build'
import {Command} from '../../Command'
import {Runner} from '../../Runner'

/**
 * `$ bud extensions:list` command class
 *
 * @internal
 */
export default class List extends Command {
  /**
   * {@inheritDoc Command.description}
   */
  public static description =
    'List extensions available to project'

  /**
   * {@inheritDoc Command.examples}
   */
  public static examples = [`$ bud extensions:list`]

  /**
   * {@inheritDoc Command.parse}
   */
  public cli: {flags: any; args: any}

  /**
   * {@inheritDoc Bud}
   */
  public app: Bud

  /**
   * {@inheritDoc Command.run}
   */
  public async run() {
    this.cli = this.parse(Build)

    const runner = new Runner(this.cli)
    this.app = await runner.make()

    this.app.dashboard.render(
      this.app.project
        .getValues('peers')
        .map(peer => `- ${peer.name}`),

      'bud extensions:list',
    )

    process.exit()
  }
}
