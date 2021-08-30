import {config} from '../../..'
import Build from '../../Build'
import {Command} from '../../Command'

export default class Install extends Command {
  public static description =
    'Install packages required by extensions'

  public static aliases = ['init']

  public static examples = [`$ bud extensions:install`]

  public async run() {
    this.cli = this.parse(Build)

    await this.appFactory(this.cli, config, false)

    this.app.project.peers.install()

    process.exit()
  }
}
