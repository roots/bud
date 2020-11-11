import {lodash as _} from '@roots/bud-support'
import {Indexed as Container} from '@roots/container'
import logger from './util/logger'
import format from './util/format'
import pretty from './util/pretty'
import type {
  Bud as Application,
  ConstructorOptions,
  Index,
} from '@roots/bud-typings'

export default class Bud implements Application {
  [key: string]: any

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

  public logger: Application['logger'] = logger

  public util: Application['util'] = {
    format,
    pretty,
  }

  public constructor({
    services,
    containers,
    builders,
    api,
    plugins,
  }: ConstructorOptions) {
    ;[
      'getInstance',
      'mapServices',
      'mapBuilders',
      'mapContainers',
      'mapCallables',
    ].forEach(name => {
      this[name] = this[name].bind(this)
    })

    containers && this.mapContainers(containers)

    services
      ? this.mapServices(services)
      : new Error('Services not instantiable')

    builders
      ? this.mapBuilders(builders)
      : new Error('Builders not instantiable')

    this.fs.setBase(process.cwd())
    this.disk.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../../'),
      glob: ['**/*'],
    })

    this.disk.set('project', {
      baseDir: this.fs.getBase(),
      glob: ['**/*'],
    })

    api && this.mapCallables(api)

    plugins && this.extensions && this.extensions.make(plugins)
  }

  public getInstance: Application['getInstance'] = function () {
    if (this.instance) {
      return this.instance
    }

    return (this.instance = new Proxy(this, {
      get(target, prop) {
        const value = target[prop as string]

        target.logger.info({prop}, `Accessing bud property`)

        return typeof value === 'function'
          ? value.bind(target)
          : value
      },

      set(target, prop, val) {
        target.logger.info(
          {prop, val},
          `Setting bud.${prop.toString()}`,
        )

        return (target[prop.toString()] = val ? true : false)
      },
    }))
  }

  /**
   * Make a new container.
   */
  public makeContainer: Application['makeContainer'] = function (
    repository,
  ) {
    return new Container(repository ?? {})
  }

  public when: Application['when'] = function (
    testCase,
    trueCase,
    falseCase,
  ) {
    _.isEqual(testCase, true)
      ? _.isFunction(trueCase) && trueCase(this)
      : _.isFunction(falseCase) && falseCase(this)

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
        this[name] = new Container(repository)
      },
    )
  }

  public mapBuilders: Application['mapBuilders'] = function (
    builders,
  ) {
    Object.values(builders).map(
      ([definitions, initializer]) =>
        Object.entries(definitions).map(definition => {
          initializer.bind(this)(definition)
        }),
      {},
    )
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
