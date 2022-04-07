/**
 * Webpack entry object with some minor
 */
export interface EntryObject {
  /**
   * Enable/disable creating async chunks that are loaded on demand.
   */
  asyncChunks?: boolean

  /**
   * The method of loading chunks (methods included by default are 'jsonp' (web), 'import' (ESM), 'importScripts' (WebWorker), 'require' (sync node.js), 'async-node' (async node.js), but others might be added by plugins).
   */
  chunkLoading?: string | false

  /**
   * Array of modules the entrypoint explicitly depends on
   */
  dependOn?: Array<string>

  /**
   * Specifies the filename of the output file on disk. You must **not** specify an absolute path here, but the path may contain folders separated by '/'! The specified path is joined with the value of the 'output.path' option to determine the location on disk.
   */
  filename?: string

  /**
   * Module(s) that are loaded upon startup.
   */
  import: string | Array<string>

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
}

/**
 * Reducer signature
 */
export interface EntryRecordReducer {
  (all: Record<string, EntryObject>, entries: EntryObject): Record<
    string,
    EntryObject
  >
}
