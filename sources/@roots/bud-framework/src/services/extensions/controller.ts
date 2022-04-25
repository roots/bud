import {Bud, Extension} from '../../'

/**
 * Modules instance controller
 *
 * @public
 */
export interface Controller<
  Ext extends Extension,
  Constructor extends {new (...args: any[]): Ext} = {
    new (...args: any[]): Ext
  },
> {
  _app: () => Bud

  app: Bud

  meta: {
    init: boolean
    register: boolean
    boot: boolean
  }

  module: Ext

  setModule(extension: Ext | Constructor): this

  has<T extends keyof Ext>(key: T & string): boolean

  get<T extends keyof Ext>(key: T): Ext[T & string]

  set<T extends keyof Ext>(key: T, value: Ext[T & string]): this

  getOption<T extends keyof Ext['options']>(
    key: T & string,
  ): Ext['options'][T & string]

  getOptions(): Ext['options']

  setOption<T extends Ext['options']>(
    key: T & string,
    value:
      | Ext['options'][T & string]
      | ((
          value: Ext['options'][T & string],
        ) => Ext['options'][T & string]),
  ): this

  setOptions(
    options:
      | Ext['options']
      | ((options: Ext['options']) => Ext['options']),
  ): this

  init(): Promise<this>

  register(): Promise<this>

  boot(): Promise<this>

  make(): Promise<{apply: any} | false>

  ensureDependenciesRanFirst(
    method: 'init' | 'register' | 'boot',
  ): Promise<void>

  isEnabled(): Promise<boolean>
}
