import {Bud} from '../../Bud'
import {config} from '../../config'
import {remove} from '../cli.dependencies'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Clean extends Command {
  public static id: string = 'Clean'
  public static title: string | undefined = 'Clean'
  public static description =
    'clean project distributables and caches'
  public static examples = [`$ bud clean`]

  public app: Bud

  public async run() {
    const runner = new Runner(this.parse(Clean), {
      config,
    })

    this.app = await runner.make(false)

    try {
      this.app.dashboard.render('Cleaning caches', 'bud clean')
      await remove(this.app.path('storage'))
    } catch (err) {
      this.app.error(err)
    }

    try {
      this.app.dashboard.render(
        'Cleaning distributables',
        'bud clean',
      )
      await remove(this.app.path('dist'))
    } catch (err) {
      this.app.error(err)
    }

    this.app.dashboard.render(
      '✔ Caches and distributables removed',
      'bud clean',
    )

    process.exit()
  }
}
