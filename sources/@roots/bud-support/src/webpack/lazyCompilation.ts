import type {Server} from 'node:net'
import type {IncomingMessage, ServerResponse, ServerOptions} from 'node:http'
import type {ServerOptions as ServerOptionsHttps} from 'node:https'

import type {Compiler, Module} from 'webpack'

export interface ListenOptions {
  port?: number | undefined;
  host?: string | undefined;
  backlog?: number | undefined;
  path?: string | undefined;
  exclusive?: boolean | undefined;
  readableAll?: boolean | undefined;
  writableAll?: boolean | undefined;
  /**
   * @default false
   */
  ipv6Only?: boolean | undefined;
}

export interface BackendApi {
	dispose: (arg0?: Error) => void;
	module: (arg0: Module) => { client: string; data: string; active: boolean };
}

export interface LazyCompilationDefaultBackendOptions {
	/**
	 * A custom client.
	 */
	client?: string;

	/**
	 * Specifies where to listen to from the server.
	 */
	listen?: number | ListenOptions | ((server: typeof Server) => void);

	/**
	 * Specifies the protocol the client should use to connect to the server.
	 */
	protocol?: "http" | "https";

	/**
	 * Specifies how to create the server handling the EventSource requests.
	 */
	server?:
		| ServerOptions<typeof IncomingMessage>
		| ServerOptionsHttps<typeof IncomingMessage, typeof ServerResponse>
		| (() => typeof Server);
}

export interface LazyCompilationOptions {
	/**
	 * Specifies the backend that should be used for handling client keep alive.
	 */
	backend?:
		| ((
				compiler: Compiler,
				callback: (err?: Error, api?: BackendApi) => void
		  ) => void)
		| ((compiler: Compiler) => Promise<BackendApi>)
		| LazyCompilationDefaultBackendOptions;

	/**
	 * Enable/disable lazy compilation for entries.
	 */
	entries?: boolean;

	/**
	 * Enable/disable lazy compilation for import() modules.
	 */
	imports?: boolean;

	/**
	 * Specify which entrypoints or import()ed modules should be lazily compiled. This is matched with the imported module and not the entrypoint name.
	 */
	test?: string | RegExp | ((module: Module) => boolean);
}
