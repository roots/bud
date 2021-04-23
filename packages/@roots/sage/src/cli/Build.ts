import {Base, flags} from './Base'
import {sage} from '../sage'

export abstract class BaseBuild extends Base {
  public static flags = {
    help: flags.help({char: 'h'}),
    cache: flags.boolean(),
    ci: flags.boolean(),
    debug: flags.boolean(),
    log: flags.boolean(),
    hash: flags.boolean(),
    hot: flags.boolean(),
    install: flags.boolean(),
    manifest: flags.boolean(),
  }

  public abstract mode: 'development' | 'production'

  public async run() {
    this.app.mode = this.mode

    this.app = sage(this.app)

    const buildConfig = await this.mergedConfig(
      this.parse(BaseBuild).flags,
    )

    await this.build()

    Object.entries(buildConfig).forEach(([k, v]) => {
      this.app.store.set(k, v)
    })

    this.app.run()
  }
}
