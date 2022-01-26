import {Signale} from '@roots/bud-support'
import {PropertyOf} from 'type-fest/source/get'

import {Service} from '../../Service'
import {Module} from './module.interface'

export interface Controller {
  /**
   * @public
   */
  meta: {
    instance: string
    bound: boolean
    mixed: boolean
    registered: boolean
    booted: boolean
  }

  get moduleLogger(): Signale

  /**
   * @internal
   */
  _module: Module

  /**
   * @public
   */
  log: typeof Service.prototype.log

  /**
   * @public
   * @decorator `@bind`
   */
  get(key: string): PropertyOf<Module, any>

  /**
   * @public
   * @decorator `@bind`
   */
  set(key: string, value: any): Controller

  /**
   * Extension module name
   *
   * @public
   */
  get name(): string
  set name(name: string)

  /**
   * Extension module options
   *
   * @public
   */
  get options()
  set options(options)

  /**
   * Mutate options
   *
   * @remarks
   * mutation fn receives a container of existing options and returns
   * an object or container of mutated options
   *
   * @param options - mutation fn
   * @public
   */
  mutateOptions(options)

  /**
   * Merge options
   *
   * @remarks
   * Supplied options must be an object or container of options to merge
   *
   * @param options - options to merge
   * @public
   */
  mergeOptions(options)

  /**
   * Merge option
   *
   * @remarks
   * Supplied options must be an object or container of options to merge
   *
   * @param key - option key
   * @param options - value to merge
   * @public
   */
  mergeOption(key, options)

  /**
   * Set an extension option
   *
   * @param key - option key
   * @param value - options value
   * @public
   */
  setOptions(value): Controller

  /**
   * Set an extension option
   *
   * @param key - option key
   * @param value - options value
   * @public
   */
  setOption(key, value)

  /**
   * Get an extension option
   *
   * @param key - option key
   * @public
   */
  getOption(key)

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  make()

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  get when()

  /**
   * Value determining if the extension should be utilized
   *
   * @public
   */
  set when(when)

  /**
   * Extension registration event
   *
   * @remarks
   * Calls the {@link Extension} callback
   *
   * @public
   */
  register(): Promise<Controller>

  /**
   * @public
   */
  api(): Promise<Controller>

  /**
   * @public
   */
  mixin(): Promise<this>

  /**
   * Extension boot event
   *
   * @remarks
   * Calls the {@link @roots/bud-framework#Module.boot} callback
   *
   * @public
   * @decorator `@bind`
   */
  boot(): Promise<this>
}
