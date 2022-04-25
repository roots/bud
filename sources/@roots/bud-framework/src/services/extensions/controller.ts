import {Bud, Extension, Modules} from '../../'

/**
 * Modules instance controller
 *
 * @public
 */
export interface Controller<K extends keyof Modules & string> {
  _app: () => Bud

  app: Bud

  meta: {
    init: boolean
    register: boolean
    boot: boolean
  }

  module: Modules[K]

  setModule(
    extension: (Extension | Extension.Constructor) & Modules[K],
  ): this

  get<T extends `${keyof Modules[K] & string}`>(key: T): Modules[K][T]

  set<T extends `${keyof Modules[K] & string}`>(
    key: T,
    value: Modules[K][T],
  ): this

  getOption<T extends `${keyof Modules[K]['options'] & string}`>(
    key: T,
  ): Modules[K]['options'][T]

  getOptions(): Modules[K]['options']

  setOption<T extends `${keyof Modules[K]['options'] & string}`>(
    key: T,
    value:
      | Modules[K]['options'][T]
      | ((value: Modules[K]['options'][T]) => Modules[K]['options'][T]),
  ): this

  setOptions(
    options:
      | Modules[K]['options']
      | ((options: Modules[K]['options']) => Modules[K]['options']),
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
