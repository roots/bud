import {Container} from '@roots/container'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {isEqual, isFunction} from '@roots/bud-support'

import Base from './Base'
import Env from '../Env'
import Mode from '../Mode'

import {
  Framework,
  Index,
  Loader,
  Module,
  Rule,
  Item,
  MaybeCallable,
} from '@roots/bud-typings'

export default abstract class extends Base implements Framework {
  public constructor(providers: Framework.Providers) {
    super(providers)

    this.providers.mutate('services', services => ({
      disk: FileSystem,
      fs: FileContainer,
      mode: Mode,
      env: Env,
      ...services,
    }))

    /**
     * This "fixes" resize emitter warnings
     * @todo actually fix this
     */
    process.setMaxListeners(0)

    /**
     * This fixes issues with SWR thinking its in the browser.
     * @todo does this fix the vue extension issue?
     */
    isEqual(typeof global.navigator, 'undefined') &&
      Object.assign(global, {navigator: {}})
  }

  public init(): this {
    this.register()
    this.boot()

    return this
  }

  public register(): void {
    this.providers
      /**
       * Register api, services, stores, loaders,
       * items, rules & extensions containers
       */
      .every((name: string, value: Index<any>) => {
        this.set(name, this.makeContainer(value))
      })

      /**
       * Register API functions
       */
      .each('api', (name: string) => {
        Object.defineProperty(this, name, {
          get: function () {
            return this.api.get(name).bind(this)
          },
          set: function (value) {
            this.api.set(name, value)
          },
        })
      })

      /**
       * Register framework services
       */
      .each('services', (name: string, service: any) => {
        this.services.set(name, new service({app: this}))

        Object.defineProperty(this, name, {
          get: function () {
            return this.services.get(name)
          },
          set: function (value) {
            this.services.set(name, value)
          },
        })
      })

      /**
       * Register stores
       */
      .each('containers', (name: string, repo: Index<any>) => {
        this.store.set(name, this.makeContainer(repo))

        Object.defineProperty(this, name, {
          get: function () {
            return this.store.get(name)
          },
          set: function (value) {
            this.store.set(name, value)
          },
        })
      })

      /**
       * Register loaders
       */
      .each('loaders', (name: string, loader: Loader) => {
        this.build.setLoader(name, loader)
      })

      /**
       * Register items
       */
      .each('items', (name: string, item: Item) => {
        this.build.setItem(name, item)
      })

      /**
       * Register rules
       */
      .each('rules', (name: string, rule: Rule) => {
        this.build.setRule(name, rule)
      })

      /**
       * Register extensions
       */
      .each('extensions', (name: string, extension: Module) => {
        this.extensions.set(name, extension)
      })
  }

  public boot(): void {
    this.fs.setBase(process.cwd())
    this.makeDisk('project', this.fs.base)
    this.makeDisk('@roots', '../../..')

    this.args.has('mode')
      ? this.mode.set(this.args.get('mode'))
      : this.mode.set('none')
  }

  public get(): this {
    return this
  }

  public set<T = any>(prop: string, value: T): void {
    this[prop] = value
  }

  public callMeMaybe<I = unknown>(value: MaybeCallable<I>): I {
    return isFunction(value)
      ? (value as CallableFunction)(this)
      : value
  }

  public makeContainer(repository?: Index<any>): Container {
    return new Container(repository ?? {})
  }

  public makeDisk(
    name: string,
    dir: string,
    glob?: string[],
  ): void {
    this.disk.set(name, {
      base: this.fs.path.resolve(__dirname, dir),
      glob: glob ?? ['**/*'],
    })
  }

  public pipe(fns: CallableFunction[]): this {
    fns.reduce((_val, fn) => {
      return fn(this)
    }, this)

    return this
  }
}
