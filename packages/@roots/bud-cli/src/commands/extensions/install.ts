import Command from '../../Command'
import {Bud} from '@roots/bud'

export default class List extends Command {
  public app: Bud

  public static description = 'Install extension dependencies'

  public static examples = [
    `$ bud extensions:install`,
    `$ bud extensions:install @roots/bud-react`,
  ]
  public static help =
    'Passing an arg will install dependencies listed by a specific extension. Pass nothing to install all dependencies.'

  public static args = [
    {
      name: 'pkg',
      description: 'name of package to install',
      required: false,
    },
  ]

  public async run() {
    this.app.discovery.install()
  }
}
