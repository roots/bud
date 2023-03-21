export type EntryObject = Partial<{
  /**
   * Enable/disable creating async chunks that are loaded on demand.
   */
  asyncChunks?: boolean

  /**
   * Base uri for this entry.
   */
  baseUri?: string

  /**
   * The method of loading chunks (methods included by default are 'jsonp' (web), 'import' (ESM), 'importScripts' (WebWorker), 'require' (sync node.js), 'async-node' (async node.js), but others might be added by plugins).
   */
  chunkLoading?: string | false

  /**
   * The entrypoints that the current entrypoint depend on. They must be loaded when this entrypoint is loaded.
   */
  dependOn?: string | string[]

  /**
   * Specifies the filename of the output file on disk. You must **not** specify an absolute path here, but the path may contain folders separated by '/'! The specified path is joined with the value of the 'output.path' option to determine the location on disk.
   */
  filename?: string

  /**
   * Module(s) that are loaded upon startup.
   */
  import: Array<string>

  /**
   * Specifies the layer in which modules of this entrypoint are placed.
   */
  layer?: null | string

  /**
   * Options for library.
   */
  library?: any

  /**
   * The 'publicPath' specifies the public URL address of the output files when referenced in a browser.
   */
  publicPath?: string

  /**
   * The name of the runtime chunk. If set a runtime chunk with this name is created or an existing entrypoint is used as runtime.
   */
  runtime?: string | false

  /**
   * The method of loading WebAssembly Modules (methods included by default are 'fetch' (web/WebWorker), 'async-node' (node.js), but others might be added by plugins).
   */
  wasmLoading?: string | false
}> & {
  import: Array<string>
  dependOn?: string | string[]
}
