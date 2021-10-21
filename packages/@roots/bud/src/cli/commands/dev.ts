import {Runner} from '../Runner'
import Build from './build'

export default class Dev extends Build {
  public static id = 'dev'
  public static title = 'dev'
  public static description = 'compile assets'
  public static examples = [`$ bud dev --cache`]
  public static args = [{name: 'mode', default: 'development'}]
  public static aliases = ['dev', 'start']

  public async run() {
    const cli = this.parse(Build)
    const runner = new Runner(cli, {mode: 'development'})

    this.app = await runner.make()

    this.app.hooks.on('done', [this.notifier.notify])

    this.app.run()
  }
}
