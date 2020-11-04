import {lodash as _} from '@roots/bud-support'

import {Indexed as Container} from '@roots/container'

import logger from './util/logger'
import format from './util/format'
import pretty from './util/pretty'

export default class Bud implements Framework.Bud {
  [key: string]: any // 🚨

  public build: Framework.Build

  public cli: Framework.CLI.Controller

  public compiler: Framework.Compiler

  public disk: Framework.FileSystem

  public env: Framework.Env

  public extensions: Framework.Extensions

  public features: Framework.Features

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
      apply(target, fn, arg) {
        const value = target[fn].bind(target)(arg ?? null)

        target.logger.info(
          {
            fn,
            arg,
            value,
          },
          `Accessing bud.${fn as string}`,
        )

        return value
      },

      get(target, prop) {
        const value = target[prop as string]

        target.logger.info(
          {target, prop},
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

  /**
   * Run the build.
   */
  public run = function (this: Framework.Bud): void {
    this.compiler.compile()

    if (this.mode.is('development')) {
      this.server.addDevMiddleware()
      this.server.addHotMiddleware()

      !_.isUndefined(this.server.getConfigItem('proxy')) &&
        this.server.addProxyMiddleware()
    }

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
      [
        this.hooks,
        ['logger', 'make', 'entries', 'on', 'filter'],
      ],
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
