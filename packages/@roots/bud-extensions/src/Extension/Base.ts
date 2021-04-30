import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'
import {Framework, Hooks, Module} from '@roots/bud-framework'

type ModuleKey = `${keyof Module & string}`

export default abstract class {
  protected _module: Module

  protected _app: Framework['get']

  public constructor(app: Framework, extension: Module) {
    this._app = app.get
    this._module = extension

    this.logger
      .scope(this.module.name)
      .success('Extension instantiated')
  }

  @bind
  public makeKey(key: ModuleKey): Hooks.Name {
    return `extension/${this.name}/${key}` as Hooks.Name
  }

  @bind
  public get(key: ModuleKey) {
    const hook = this.makeKey(key)
    const value = this.app.subscribe(hook, this.name)

    this.logger.log({
      message: `get ${hook}: ${value}`,
    })

    return value
  }

  @bind
  public set(key: ModuleKey, value: any) {
    const hook = this.makeKey(key)

    this.app.publish({[hook]: value}, this.name)

    this.logger.log({
      message: `set ${hook}: ${value}`,
    })
  }

  public get module(): Module {
    return this.app.access(this._module)
  }

  public get app(): Framework {
    return this._app()
  }

  public get logger() {
    return this.app.extensions.logger
  }

  public get name(): keyof Hooks.Extension.Definitions {
    return this.module.name
  }

  public get options() {
    return this.app.access(this.get('options'))
  }

  public set options(options: Module['options']) {
    this.set('options', options)
  }

  public get dependencies() {
    return this.app.access(this.get('dependencies'))
  }

  public set dependencies(dependencies: Module['dependencies']) {
    this.set('dependencies', dependencies)
  }

  public get devDependencies() {
    return this.app.access(this.get('devDependencies'))
  }

  public set devDependencies(
    devDependencies: Module['devDependencies'],
  ) {
    this.set('devDependencies', devDependencies)
  }

  public get when() {
    if (_.isFunction(this.get('when'))) {
      return this.get('when')(
        this.app,
        this.app.container(this.options),
      )
    }

    return this.get('when')
  }

  public set when(when: Module['when']) {
    this.set('when', when)
  }

  public get make() {
    if (this.when == false) {
      this.logger.debug({
        message: `not set for inclusion. skipping.`,
        affix: this.when,
      })

      return
    }

    if (!this.get('make')) {
      return
    }

    if (_.isFunction(this.get('make'))) {
      return this.get('make')(
        this.options
          ? this.app.container(this.options)
          : this.app.container({}),
        this.app,
      )
    }

    return this.get('make')
  }

  public set make(make: Module['make']) {
    this.set('make', make)
  }
}
