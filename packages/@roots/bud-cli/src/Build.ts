import {Command} from './Command'
import * as flags from './flags'
import {cosmiconfig as conf} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import {Bud} from '@roots/bud'

export abstract class Build extends Command {
  public static app: Bud

  public static flags = {
    help: flags.help({char: 'h'}),
    cache: flags.cache(),
    ci: flags.ci(),
    debug: flags.debug(),
    log: flags.log(),
    hash: flags.boolean(),
    install: flags.boolean(),
    'locations.project': flags.string(),
    'locations.src': flags.string(),
    'locations.dist': flags.string(),
    'locations.storage': flags.string(),
    manifest: flags.boolean(),
    'server.middleware.hot': flags.boolean(),
    'server.middleware.proxy': flags.boolean(),
    'server.proxy.host': flags.string(),
    'server.proxy.port': flags.string(),
  }

  public abstract mode: 'development' | 'production'

  public async conf() {
    const res = await conf(Build.app.name, {
      searchPlaces: [
        `.${Build.app.name}rc`,
        `.${Build.app.name}rc.json`,
        `.${Build.app.name}rc.yaml`,
        `.${Build.app.name}rc.yml`,
      ],
      loaders: {
        '.ts': TypeScriptLoader,
      },
    }).search()

    return res?.config
  }

  public async build() {
    const res = await conf(Build.app.name, {
      searchPlaces: [
        `${Build.app.name}.config.ts`,
        `${Build.app.name}.config.js`,
        `.${Build.app.name}rc.ts`,
        `.${Build.app.name}rc.js`,
      ],
      loaders: {
        '.ts': TypeScriptLoader,
      },
    }).search()

    return res?.config(Build.app)
  }

  public async run() {
    this.config.runHook('app', {})

    const config = await this.conf()
    const merged = await this.configMerge(
      config,
      this.parse(Build).flags ?? {},
    )

    Build.app.mode = this.mode

    await this.build()

    Object.entries(merged).forEach(([k, v]) => {
      Build.app.store.set(k, v)
    })

    Build.app.run()
  }
}
