import * as Model from '../Model'
import * as Config from '@roots/bud-config'
import {Server, ServerModel} from '@roots/bud-server'
import Compiler from '@roots/bud-compiler'
import {FileContainer, FileSystem} from '@roots/filesystem'
import Webpack from 'webpack'
import Build from '../Build'
import Components from '../Components'
import corePlugins from '../Components/plugins'
import {Extensions} from '../Extend/Extensions'
import Hooks from '../Extend/Hooks'
import Store from '../Store'
import {env} from './env'
import format from './util/format'
import pretty from './util/pretty'
import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

/**
 * Bud class.
 */
class Bud implements Framework.Bud {
  /**
   * @note I'm not sure how to type something this flexible.
   */
  [key: string]: any

  private static PRIMARY_DISK = 'project'

  public build: Framework.Bud['build']

  public components: Framework.Bud['components']

  public compiler: Framework.Bud['compiler']

  public disks: Framework.Bud['disks']

  public env: Framework.Bud['env']

  public extensions: Framework.Bud['extensions']

  public fs: Framework.Bud['fs']

  public hooks: Framework.Bud['hooks']

  public server: Framework.Bud['server']

  public logger: Framework.Bud['logger']

  public mode: Framework.Bud['mode']

  public store: Framework.Bud['store']

  public util: Framework.Bud['util'] = {
    format,
    pretty,
  }

  /**
   * Creates an instance of Bud.
   *
   * @memberof Bud
   */
  public constructor() {
    this.hooks = Hooks(this.logger)
    this.components = new Store()
    this.store = new Store()
    this.extensions = new Extensions(this)
    this.disks = new FileSystem()
    this.fs = new FileContainer()
    this.compiler = new Compiler()
    this.server = new Server()

    this.init()
  }

  /**
   * Initialize class.
   */
  public init: Framework.Bud['init'] = function () {
    /**
     * Bind the build function.
     */
    this.build = Build.bind(this)

    /**
     * Bind the frozen object form of env.
     */
    this.env = env.bind(this)()

    /**
     * Load the Bud.Store with initial models.
     */
    this.store.create('server', ServerModel)
    Object.entries(Model).map(([name, model]) => {
      return this.store.create(name, model)
    })

    /**
     * @todo A terrible place to instantiate Bud.mode
     * @see {Webpack.Configuration['mode']}
     */
    this.mode = {
      is: (check: unknown) =>
        this.store['build'].is('mode', check),
      get: () => this.store['build'].get('mode'),
      set: (mode: Webpack.Configuration['mode']) => {
        this.store['build'].set('mode', mode)
        return this
      },
    }

    // Binds API
    Object.entries(Config).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )

    // Manufactures interfaces used by bud.build
    Object.entries(Components(this)).map(([name, component]) => {
      return this.components.create(name, component)
    })

    // Setup filesystem.
    filesystemSetup.bind(this)()
    parseArguments.bind(this)()

    // Boot extensions.
    this.extensions.boot(corePlugins)
  }

  /**
   * Make a new disk virtual disk.
   */
  public makeDisk: Framework.Bud['makeDisk'] = function (
    key = Bud.PRIMARY_DISK,
    baseDir?,
    glob?,
  ): FileContainer {
    return this.disks.set(key, {
      baseDir,
      glob,
    })
  }

  /**
   * Load a disk in place of the current one.
   */
  public useDisk: Framework.Bud['useDisk'] = function (
    key = Bud.PRIMARY_DISK,
  ) {
    return this.disks.get(key)
  }

  /**
   * Make a container.
   */
  public makeContainer: Framework.Bud['makeContainer'] = function (
    baseDir,
  ) {
    return new FileContainer(baseDir ?? process.cwd())
  }
}

export {Bud}
