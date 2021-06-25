import Command from '../../Command'

export default class List extends Command {
  public static description =
    'Install packages required by extensions'

  public static aliases = ['init']

  public static examples = [`$ bud extensions:install`]

  public async run() {
    this.app.discovery.install()

    process.exit()
  }
}
