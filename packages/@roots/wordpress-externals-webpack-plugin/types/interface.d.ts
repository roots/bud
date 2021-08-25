/**
 * @namespace WordPressExternals
 */
declare namespace WordPressExternals {
  type Output = {
    dir: string
    name: string
    file: string
    publicPath: string
    content: Content
  }
  type EntrySchema = {
    [key: string]: string | string[]
  }
  type Content = EntrySchema | EntrySchema[] | null
  /**
   * Plugin options
   */
  type Options = {
    /**
     * Name of outputted file.
     */
    name: string
    /**
     * Should manifest be written to disk.
     */
    writeToFileEmit: boolean
    /**
     * Transform requests for 'react' and 'react-dom'
     * to '@wordpress/element'
     */
    useElementAsReact: boolean
  }
  interface Hash {
    [key: string]: any
  }
}
/**
 * @exports WordPressExternals
 */
export {WordPressExternals}
//# sourceMappingURL=interface.d.ts.map
