import {GlobTask} from './'
import {Framework} from './'

/**
 * Bud API
 */

export namespace Api {
  export type Externals<T = Framework> = (
    this: T,
    externals: {
      [key: string]: any
    },
  ) => T

  export type Glob<T = Framework> = (
    this: T,
    name: string,
    files: GlobTask['pattern'],
    options: GlobTask['options'],
  ) => T

  export type Hash<T = Framework> = (
    this: T,
    enabled?: boolean,
  ) => T

  export type Minify<T = Framework> = (this: T) => T

  export type ProjectPath<T = Framework> = (
    this: T,
    dir: string,
  ) => T

  export type Proxy<T = Framework> = (
    this: T,
    config?: {
      enabled?: boolean
      host?: Framework.Server.Options['proxy']['host']
      port?: Framework.Server.Options['proxy']['port']
    },
  ) => T

  export type PublicPath<T = Framework> = (
    this: T,
    publicPath: string,
  ) => T

  export type Run<T = Framework> = (
    this: T,
    safeMode?: boolean,
  ) => void

  export type Runtime<T = Framework> = (this: T) => T

  export type Src<T = Framework> = (
    this: T,
    segment?: string,
  ) => string

  export type Storage<T = Framework> = (
    this: T,
    path?: string,
  ) => T

  export type Stringify<T = Framework> = (
    this: T,
    string: unknown,
  ) => string

  export type SrcPath<T = Framework> = (
    this: T,
    segment: string,
  ) => T

  export type Target<T = Framework> = (
    this: T,
    target: string,
  ) => T

  export type Vendor<T = Framework> = (this: T) => T
}
