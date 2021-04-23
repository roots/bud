import {Base, flags} from './Base'
import {sage} from '../sage'

export abstract class BaseBuild extends Base {
  public static flags = {
    help: flags.help({char: 'h'}),
    ci: flags.boolean(),
    debug: flags.boolean(),
    log: flags.boolean(),
    hot: flags.boolean(),
    cache: flags.boolean(),
  }

  public abstract mode: 'development' | 'production'

  public async run() {
    this.app.mode = this.mode

    this.app = sage(this.app)

    const buildConfig = this.mergedConfig(
      this.parse(BaseBuild).flags,
    )

    this.app = this.build()

    Object.entries(buildConfig).forEach(([k, v]) => {
      this.app.store.set(k, v)
    })

    this.app.run()
  }
}
