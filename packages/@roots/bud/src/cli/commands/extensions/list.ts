import {config} from '../../..'
import Build from '../../Build'
import {Command} from '../../Command'

export default class List extends Command {
  public static description =
    'List extensions available to project'

  public static examples = [`$ bud extensions:list`]

  public async run() {
    this.cli = this.parse(Build)

    await this.appFactory(this.cli, config, false)

    this.app.dashboard.render(
      this.app.project
        .getValues('peers')
        .map(peer => `- ${peer.name}`),

      'bud extensions:list',
    )

    process.exit()
  }
}
