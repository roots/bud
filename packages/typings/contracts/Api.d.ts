import {CompressionPlugin, GlobTask, Webpack, zlib} from './'
import {Framework} from './'

/**
 * Bud API
 */

export namespace Api {
  export type AddPlugin<T = Framework> = (
    this: T,
    name: string,
    make: Webpack.Plugin | CallableFunction,
  ) => T

  export type Alias<T = Framework> = (
    this: T,
    aliases: {
      [key: string]: string
    },
  ) => T

  export type Copy<T = Framework> = (
    this: T,
    options: Copy.Options,
  ) => T

  export namespace Copy {
    export interface Options {
      from: string
      to: string
      context: string
      options: {
        noErrorOnMissing: boolean
        globOptions: {
          ignore: string
        }
      }
    }
  }

  export type Define<T = any> = (
    this: Framework<T>,
    values: Framework.Index<any>,
  ) => Framework<T>

  export type Dev<T = Framework> = (
    this: T,
    config: Framework.Server.Options,
  ) => T

  export type Devtool<T = Framework> = (
    this: T,
    devtool?: Webpack.Configuration['devtool'],
  ) => T

  export type Dist<T = Framework> = (
    this: T,
    path?: string,
  ) => string

  export type DistPath<T = Framework> = (
    this: T,
    segment: string,
  ) => T

  export type Entry<T = Framework> = (
    this: T,
    bundleName: string,
    assets:
      | string
      | string[]
      | {
          [key: string]: string | string[]
        },
  ) => T

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

  export type Gzip<T = Framework> = (
    this: T,
    options?: Framework.Module.Options<Gzip.Options>,
  ) => T

  namespace Gzip {
    export type Options = CompressionPlugin.Options<zlib.ZlibOptions>
  }

  export type Hash<T = Framework> = (
    this: T,
    enabled?: boolean,
  ) => T

  export type Minify<T = Framework> = (this: T) => T

  export type ProjectPath<T = Framework> = (
    this: T,
    dir: string,
  ) => T

  export type Provide<T = Framework> = (
    this: T,
    options: {
      [key: string]: string | string[]
    },
  ) => T

  export type Project<T = Framework> = (
    this: T,
    path?: string,
  ) => string

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

  export type Html<T = Framework> = (
    this: T,
    options?: Framework.Module.Options<{
      template?: string
      replacements?: Framework.Index<string>
    }>,
  ) => T

  export type Vendor<T = Framework> = (this: T) => T
}
