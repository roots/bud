/**
 * @module @roots/bud-framework
 */

import {boundMethod as bind} from 'autobind-decorator'
import * as _ from 'lodash'

import {Framework} from './Framework'
import {Hooks} from './Hooks'
import {Module} from './Module'

type Key = `${keyof Framework.Extensions & string}`

/**
 * @interface Extension
 *
 * Abstract Extension
 */
abstract class Extension {
  protected _module: Module

  protected _app: () => Framework

  public abstract register(): Extension

  public abstract boot(): Extension

  public constructor(app: Framework, extension: Module) {
    this._app = () => app
    this._module = extension
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

  public set when(when: Module.When) {
    this.set('when', when)
  }

  /**
   * @property {Module.Make} make
   */
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

  /**
   * @property {WebpackPluginInstance['apply']} apply
   */
  public get apply() {
    if (this.when == false || !this.get('apply'))
      return undefined

    if (_.isFunction(this.get('apply'))) {
      return this.get('apply')
    }

    return undefined
  }

  public set make(make: Module.Make) {
    this.set('make', make)
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
}

/**
 * @exports Extension
 */
export {Extension}
