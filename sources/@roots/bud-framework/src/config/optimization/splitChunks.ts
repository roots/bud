import type {AssetInfo, Chunk, PathData} from '@roots/bud-support/webpack'

export interface SplitChunks {
  /**
   * Sets the name delimiter for created chunks.
   */
  automaticNameDelimiter?: string

  /**
   * Assign modules to a cache group (modules from different cache groups are tried to keep in separate chunks, default categories: 'default', 'defaultVendors').
   */
  cacheGroups?: {
    [index: string]:
      | false
      | Function
      | RegExp
      | SplitChunksCacheGroup
      | string
  }

  /**
   * Select chunks for determining shared modules (defaults to "async", "initial" and "all" requires adding these chunks to the HTML).
   */
  chunks?: 'all' | 'async' | 'initial' | ((chunk: Chunk) => boolean)

  /**
   * Sets the size types which are used when a number is used for sizes.
   */
  defaultSizeTypes?: string[]

  /**
   * Size threshold at which splitting is enforced and other restrictions (minRemainingSize, maxAsyncRequests, maxInitialRequests) are ignored.
   */
  enforceSizeThreshold?: {[index: string]: number} | number

  /**
   * Options for modules not selected by any other cache group.
   */
  fallbackCacheGroup?: {
    /**
     * Sets the name delimiter for created chunks.
     */
    automaticNameDelimiter?: string
    /**
     * Select chunks for determining shared modules (defaults to "async", "initial" and "all" requires adding these chunks to the HTML).
     */
    chunks?: 'all' | 'async' | 'initial' | ((chunk: Chunk) => boolean)
    /**
     * Maximal size hint for the on-demand chunks.
     */
    maxAsyncSize?: {[index: string]: number} | number
    /**
     * Maximal size hint for the initial chunks.
     */
    maxInitialSize?: {[index: string]: number} | number
    /**
     * Maximal size hint for the created chunks.
     */
    maxSize?: {[index: string]: number} | number
    /**
     * Minimal size for the created chunk.
     */
    minSize?: {[index: string]: number} | number
    /**
     * Minimum size reduction due to the created chunk.
     */
    minSizeReduction?: {[index: string]: number} | number
  }

  /**
   * Sets the template for the filename for created chunks.
   */
  filename?:
    | ((pathData: PathData, assetInfo?: AssetInfo) => string)
    | string

  /**
   * Prevents exposing path info when creating names for parts splitted by maxSize.
   */
  hidePathInfo?: boolean

  /**
   * Maximum number of requests which are accepted for on-demand loading.
   */
  maxAsyncRequests?: number

  /**
   * Maximal size hint for the on-demand chunks.
   */
  maxAsyncSize?: {[index: string]: number} | number

  /**
   * Maximum number of initial chunks which are accepted for an entry point.
   */
  maxInitialRequests?: number

  /**
   * Maximal size hint for the initial chunks.
   */
  maxInitialSize?: {[index: string]: number} | number

  /**
   * Maximal size hint for the created chunks.
   */
  maxSize?: {[index: string]: number} | number

  /**
   * Minimum number of times a module has to be duplicated until it's considered for splitting.
   */
  minChunks?: number

  /**
   * Minimal size for the chunks the stay after moving the modules to a new chunk.
   */
  minRemainingSize?: {[index: string]: number} | number

  /**
   * Minimal size for the created chunks.
   */
  minSize?: {[index: string]: number} | number

  /**
   * Minimum size reduction due to the created chunk.
   */
  minSizeReduction?: {[index: string]: number} | number

  /**
   * Give chunks created a name (chunks with equal name are merged).
   */
  name?: false | Function | string

  /**
   * Compare used exports when checking common modules. Modules will only be put in the same chunk when exports are equal.
   */
  usedExports?: boolean
}

export interface SplitChunksCacheGroup {
  /**
   * Sets the name delimiter for created chunks.
   */
  automaticNameDelimiter?: string

  /**
   * Select chunks for determining cache group content (defaults to "initial", "initial" and "all" requires adding these chunks to the HTML).
   */
  chunks?: 'all' | 'async' | 'initial' | ((chunk: Chunk) => boolean)

  /**
   * Ignore minimum size, minimum chunks and maximum requests and always create chunks for this cache group.
   */
  enforce?: boolean

  /**
   * Size threshold at which splitting is enforced and other restrictions (minRemainingSize, maxAsyncRequests, maxInitialRequests) are ignored.
   */
  enforceSizeThreshold?: {[index: string]: number} | number

  /**
   * Sets the template for the filename for created chunks.
   */
  filename?:
    | ((pathData: PathData, assetInfo?: AssetInfo) => string)
    | string

  /**
   * Sets the hint for chunk id.
   */
  idHint?: string

  /**
   * Assign modules to a cache group by module layer.
   */
  layer?: Function | RegExp | string

  /**
   * Maximum number of requests which are accepted for on-demand loading.
   */
  maxAsyncRequests?: number

  /**
   * Maximal size hint for the on-demand chunks.
   */
  maxAsyncSize?: {[index: string]: number} | number

  /**
   * Maximum number of initial chunks which are accepted for an entry point.
   */
  maxInitialRequests?: number

  /**
   * Maximal size hint for the initial chunks.
   */
  maxInitialSize?: {[index: string]: number} | number

  /**
   * Maximal size hint for the created chunks.
   */
  maxSize?: {[index: string]: number} | number

  /**
   * Minimum number of times a module has to be duplicated until it's considered for splitting.
   */
  minChunks?: number

  /**
   * Minimal size for the chunks the stay after moving the modules to a new chunk.
   */
  minRemainingSize?: {[index: string]: number} | number

  /**
   * Minimal size for the created chunk.
   */
  minSize?: {[index: string]: number} | number

  /**
   * Minimum size reduction due to the created chunk.
   */
  minSizeReduction?: {[index: string]: number} | number

  /**
   * Give chunks for this cache group a name (chunks with equal name are merged).
   */
  name?: false | Function | string

  /**
   * Priority of this cache group.
   */
  priority?: number

  /**
   * Try to reuse existing chunk (with name) when it has matching modules.
   */
  reuseExistingChunk?: boolean

  /**
   * Assign modules to a cache group by module name.
   */
  test?: Function | RegExp | string

  /**
   * Assign modules to a cache group by module type.
   */
  type?: Function | RegExp | string

  /**
   * Compare used exports when checking common modules. Modules will only be put in the same chunk when exports are equal.
   */
  usedExports?: boolean
}
