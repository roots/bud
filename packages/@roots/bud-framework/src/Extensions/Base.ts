import {Framework} from '../Framework'
import {Hooks} from '../Hooks'
import {Module} from './Module'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

type Key = `${keyof Framework.Extensions & string}`

abstract class Base {
  protected _module: Module

  protected _app: () => Framework

  public constructor(app: Framework, extension: Module) {
    this._app = () => app
    this._module = extension
  }

  @bind
  public makeKey(key: Key): Hooks.Name {
    return `extension/${String(this.name)}/${key}` as Hooks.Name
  }

  @bind
  public get(key: Key) {
    const hook = this.makeKey(key)
    const value = this.app.hooks.filter(hook)
    return value
  }

  @bind
  public set(key: Key, value: any) {
    this.app.hooks.on(this.makeKey(key), value)
  }

  public get module(): Module {
    return this.app.access(this._module)
  }

  public get app(): Framework {
    return this._app()
  }

  public get name(): keyof Framework.Extensions {
    return this.module.name
  }

  public get options() {
    return this.app.access(this.get('options'))
  }

  public set options(options: Module['options']) {
    this.set('options', options)
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
    if (this.when == false || !this.get('make')) return

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

  public set make(make: Module.Make) {
    this.set('make', make)
  }
}

export default Base
