import Command from '../../Command'
import {Framework} from '@roots/bud'

export default class List extends Command {
  public app: Framework

  public static description =
    'Install packages required by extensions'

  public static aliases = ['init']

  public static examples = [`$ bud extensions:install`]

  public async run() {
    this.app.discovery.install()

    process.exit()
  }
}
