import {lodash as _} from '@roots/bud-support'
import {Indexed as Container} from '@roots/container'
import util from './util'
import type {
  Bud as Application,
  ConstructorOptions,
  Index,
} from '@roots/bud-typings'

export default class Bud implements Application {
  [key: string]: any

  public registered: Application['registered']

  public build: Application['build']

  public cli: Application['cli']

  public compiler: Application['compiler']

  public disk: Application['disk']

  public env: Application['env']

  public fs: Application['fs']

  public extensions: Application['extensions']

  public hooks: Application['hooks']

  public mode: Application['mode']

  public presets: Application['presets'] = new Container({})

  public server: Application['server']

  public instance: Application['instance']

  public util: Application['util'] = util

  public logger: Application['logger'] = util.logger

  public proxy: Application['proxy'] = util.proxy

  public when: Application['when'] = util.when

  public constructor(options: ConstructorOptions) {
    ;[
      'mapServices',
      'mapBuilders',
      'mapContainers',
      'mapCallables',
      'mapDisks',
      'makeContainer',
      'run',
      'bootstrap',
    ].forEach(name => {
      this[name] = this[name].bind(this)
    })

    this.registered = this.makeContainer(options)
  }

  public bootstrap(): this {
    this.mapContainers(this.registered.get('containers'))

    this.mapServices(this.registered.get('services'))

    this.mapBuilders(this.registered.get('builders'))

    this.mapDisks(this.registered.get('disks'))

    this.mapCallables(this.registered.get('api'))

    this.extensions.make(this.registered.get('plugins'))

    return this
  }

  public mapDisks = function (disks): void {
    this.fs.setBase(process.cwd())

    Object.entries(disks(this)).map(([name, options]) => {
      this.disk.set(name, options)
    })
  }

  /**
   * Make a new container.
   */
  public makeContainer: Application['makeContainer'] = function (
    repository,
  ) {
    return new Container(repository)
  }

  public when: Application['when'] = function (
    test,
    isTrue,
    isFalse,
  ) {
    _.isEqual(test, true)
      ? _.isFunction(isTrue) && isTrue(this)
      : _.isFunction(isFalse) && isFalse(this)

    return this
  }

  public run: Application['run'] = function () {
    if (this.mode.is('development')) {
      this.server.addDevMiddleware()
      this.server.addHotMiddleware()

      !_.isUndefined(this.server.getConfigItem('proxy')) &&
        this.server.addProxyMiddleware()
    }

    this.compiler.compile()
    this.cli.run()
  }

  public mapContainers: Application['mapContainers'] = function (
    containers,
  ) {
    Object.entries(containers).map(
      ([name, repository]: [string, Index<unknown>]) => {
        this[name] = this.makeContainer(repository)
      },
    )
  }

  public mapBuilders: Application['mapBuilders'] = function (
    builders,
  ) {
    Object.values(builders).map(([definitions, initializer]) => {
      Object.entries(definitions).map(definition => {
        initializer.bind(this)(definition)
      })
    }, {})
  }

  public mapCallables: Application['mapCallables'] = function (
    callables,
  ) {
    Object.entries(callables).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )
  }

  public mapServices: Application['mapServices'] = function (
    services,
  ) {
    Object.entries(services).map(([name, initializer]) => {
      Object.assign(this, {
        [name]: initializer(this),
      })

      Object.defineProperty(this[name], 'bud', {
        enumerable: false,
      })
    })
  }
}
