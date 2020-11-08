import {lodash as _} from '@roots/bud-support'
import {Indexed as Container} from '@roots/container'
import logger from './util/logger'
import format from './util/format'
import pretty from './util/pretty'
import {Compiler} from '@roots/bud-compiler/src/Compiler'

export default class Bud implements Framework.Bud {
  [key: string]: any // 🚨

  public build: Framework.Build

  public cli: Framework.CLI.Controller

  public compiler: Compiler.Abstract

  public disk: Framework.FileSystem

  public env: Framework.Env

  public extensions: Framework.Extensions

  public fs: Framework.FileContainer

  public hooks: Framework.Hooks

  public logger: Framework.Logger = logger

  public mode: Framework.Mode

  public presets: Framework.Indexed = new Container()

  public server: Framework.Server

  public util: Framework.Util = {
    format,
    pretty,
  }

  public constructor(params: ConstructorParameters) {
    ;[
      'getInstance',
      'mapServices',
      'mapBuilders',
      'mapContainers',
      'mapCallables',
      'run',
      'assign',
    ].forEach(name => {
      this[name] = this[name].bind(this)
    })

    params.services &&
      (instance => {
        instance.mapServices(params.services.bind(instance)())
      })(this)

    params.containers && this.mapContainers(params.containers)
    params.builders && this.mapBuilders(params.builders)
    params.api && this.mapCallables(params.api)
    params.plugins && this.extensions.boot(params.plugins)

    this.tidy.bind(this)()

    this.disk.set('@roots', {
      baseDir: this.fs.path.resolve(__dirname, '../../../'),
      glob: ['**/*'],
    })

    this.disk.set('project', {
      baseDir: process.cwd(),
      glob: ['**/*'],
    })
  }

  /**
   * Returns a proxy of this class.
   *
   * Allows running functions calls, accessors and setters through the logger.
   */
  public getInstance = function (
    this: Framework.Bud,
  ): Framework.Bud {
    if (this.instance) {
      return this.instance
    }

    return (this.instance = new Proxy(this, {
      get(target, prop) {
        const value = target[prop as string]

        target.logger.info(
          {prop},
          `Accessing bud property: ${prop as string}`,
        )

        return typeof value === 'function'
          ? value.bind(target)
          : value
      },

      set(target, prop, val) {
        target.logger.info(
          {prop, val},
          `Setting bud.${prop.toString()} to ${val.toString()}`,
        )

        return (target[prop.toString()] = val ? true : false)
      },
    }))
  }

  /**
   * Assign values.
   */
  public assign(value: unknown): void {
    Object.assign(this, {value})
  }

  /**
   * Make a new container.
   */
  public makeContainer(
    repository?: Container.Repository,
  ): Container {
    return new Container(repository ?? {})
  }

  public when(
    test: boolean,
    trueCase?: CallableFunction,
    falseCase?: CallableFunction,
  ): Framework.Bud {
    _.isEqual(test, true)
      ? _.isFunction(trueCase) && trueCase(this)
      : _.isFunction(falseCase) && falseCase(this)

    return this
  }

  public callMeMaybe(
    item: CallableFunction | unknown,
    args?: Array<unknown>,
  ): unknown {
    args = !args ? [] : Array.isArray(args) ? args : [args]

    return typeof item == 'function' && !Array.isArray(item)
      ? item(...args)
      : item
  }

  /**
   * Run the build.
   */
  public run = function (this: Framework.Bud): void {
    if (this.mode.is('development')) {
      this.server.addDevMiddleware()
      this.server.addHotMiddleware()

      !_.isUndefined(this.server.getConfigItem('proxy')) &&
        this.server.addProxyMiddleware()
    }

    this.compiler.compile()
    this.cli.run()
  }

  /**
   * Map builders
   */
  public mapBuilders = async function (
    this: Framework.Bud,
    builders: Framework.Builders,
  ): Promise<void> {
    builders.map(
      ([builderSet, registration]: [
        Framework.Index<any>,
        (any) => void,
      ]) => {
        Object.entries(builderSet).map((builder: any) =>
          registration.bind(this)(builder),
        )
      },
    )
  }

  /**
   * Map api callables and top-level utilities
   */
  public mapCallables = async function (
    callables: Framework.Index<CallableFunction>,
  ): Promise<void> {
    Object.entries(callables).map(
      ([name, fn]: [string, CallableFunction]) => {
        this[name] = fn.bind(this)
      },
    )
  }

  /**
   * Map services to Framework.
   */
  public mapServices = async function (
    this: Framework.Bud,
    services: Framework.Services,
  ): Promise<Array<string>> {
    return Object.entries(services).map(
      ([name, [service, dependencies]]) => {
        this[name] = new service(dependencies)
        this[name].dump = function () {
          console.log(this)
        }.bind(this[name])

        Object.defineProperty(this[name], 'bud', {
          enumerable: false,
        })

        return name
      },
    )
  }

  /**
   * Map container objects
   */
  public mapContainers = async function (
    containers: Framework.Index<Framework.Index<any>>,
  ): Promise<void> {
    Object.entries(containers).map(
      ([name, repository]: [string, Framework.Index<any>]) => {
        this[name] = new Container(repository)
      },
    )
  }

  public tidy = function () {
    const mute = [
      [
        this,
        [
          'tidy',
          'util',
          'logger',
          'getInstance',
          'mapServices',
          'mapBuilders',
          'mapContainers',
          'mapCallables',
          'run',
          'assign',
        ],
      ],
      [
        this.server,
        [
          'instance',
          'setConfig',
          'addMiddleware',
          'addDevMiddleware',
          'addHotMiddleware',
          'addProxyMiddleware',
        ],
      ],
      [this.hooks, ['logger', 'on', 'filter']],
      [
        this.extensions,
        [
          'bindApi',
          'getExtension',
          'boot',
          'makePlugins',
          'processRules',
          'processOptions',
          'processLoaders',
          'processRuleItems',
        ],
      ],
      [
        this.fs,
        [
          'fs',
          'glob',
          'path',
          'from',
          'watcher',
          'setBase',
          'getBase',
          'exists',
          'read',
          'setDisk',
          'dump',
        ],
      ],
      [
        this.disk.current,
        [
          'fs',
          'glob',
          'path',
          'from',
          'watcher',
          'setBase',
          'getBase',
          'exists',
          'read',
          'setDisk',
          'dump',
        ],
      ],
    ]

    mute.forEach(([target, methods]: [any, Array<string>]) => {
      if (!target) return

      methods.forEach(method => {
        Object.defineProperty(target, method, {
          enumerable: false,
        })
      })
    })

    Object.getOwnPropertyNames(this).forEach(name => {
      this[name].hasOwnProperty('dump') &&
        Object.defineProperty(this[name], 'dump', {
          enumerable: false,
        })

      this[name].hasOwnProperty('bud') &&
        Object.defineProperty(this[name], 'bud', {
          enumerable: false,
        })
    })
  }
}

declare interface ConstructorParameters {
  api?: Framework.Index<CallableFunction>
  builders?: Framework.Builders
  containers?: Framework.Index<Framework.Index<any>>
  plugins?: Framework.Index<Framework.Extension>
  services?: Framework.Services
}
