import {Runner} from '../Runner'
import Build from './build'

export default class Serve extends Build {
  public static id = 'serve'
  public static title = 'serve'
  public static description = 'compile assets'
  public static examples = [`$ bud serve --cache`]
  public static aliases = ['dev', 'start']

  public async run() {
    const options = this.parse(Build)
    options.flags.mode = 'development'

    const runner = new Runner(options)

    await runner.initialize()
    this.app = await runner.make()

    this.app.hooks.on('done', [this.notifier.notify])

    this.app.run()
  }
}
