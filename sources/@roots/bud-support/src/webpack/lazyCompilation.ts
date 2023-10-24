import type {Compiler, Module} from 'webpack'

import type {
  IncomingMessage,
  ServerOptions,
  ServerResponse,
} from 'node:http'
import type {ServerOptions as ServerOptionsHttps} from 'node:https'
import type {Server} from 'node:net'

export interface ListenOptions {
  backlog?: number | undefined
  exclusive?: boolean | undefined
  host?: string | undefined
  /**
   * @default false
   */
  ipv6Only?: boolean | undefined
  path?: string | undefined
  port?: number | undefined
  readableAll?: boolean | undefined
  writableAll?: boolean | undefined
}

export interface BackendApi {
  dispose: (arg0?: Error) => void
  module: (arg0: Module) => {active: boolean; client: string; data: string}
}

export interface LazyCompilationDefaultBackendOptions {
  /**
   * A custom client.
   */
  client?: string

  /**
   * Specifies where to listen to from the server.
   */
  listen?: ((server: typeof Server) => void) | ListenOptions | number

  /**
   * Specifies the protocol the client should use to connect to the server.
   */
  protocol?: 'http' | 'https'

  /**
   * Specifies how to create the server handling the EventSource requests.
   */
  server?:
    | (() => typeof Server)
    | ServerOptions<typeof IncomingMessage>
    | ServerOptionsHttps<typeof IncomingMessage, typeof ServerResponse>
}

export interface LazyCompilationOptions {
  /**
   * Specifies the backend that should be used for handling client keep alive.
   */
  backend?:
    | ((
        compiler: Compiler,
        callback: (err?: Error, api?: BackendApi) => void,
      ) => void)
    | ((compiler: Compiler) => Promise<BackendApi>)
    | LazyCompilationDefaultBackendOptions

  /**
   * Enable/disable lazy compilation for entries.
   */
  entries?: boolean

  /**
   * Enable/disable lazy compilation for import() modules.
   */
  imports?: boolean

  /**
   * Specify which entrypoints or import()ed modules should be lazily compiled. This is matched with the imported module and not the entrypoint name.
   */
  test?: ((module: Module) => boolean) | RegExp | string
}
