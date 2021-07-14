import Command from '../../Command'
import {Framework, config} from '@roots/bud'
import Runner from '../../Runner'
import Build from '../../Build'

export default class List extends Command {
  public static description =
    'List extensions available to project'

  public static examples = [`$ bud extensions:list`]

  public cli: {flags: any; args: any}

  public app: Framework

  public async run() {
    this.cli = this.parse(Build)

    const runner = new Runner(this.cli, {
      config,
      mode: 'production',
    })
    this.app = await runner.make()

    this.app.dashboard.render(
      this.app.discovery
        .getValues('peers')
        .map(peer => `- ${peer.name}`),

      'bud extensions:list',
    )

    process.exit()
  }
}
