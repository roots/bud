/**
 * WordPress externals plugin
 */
export type Output = {
  dir: string
  name: string
  file: string
  publicPath: string
  content: Content
}

export type EntrySchema = {
  [key: string]: string | string[]
}

export type Content = EntrySchema | EntrySchema[] | null

/**
 * Plugin options
 */
export type Options = {
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
   * to `@wordpress/element`
   */
  useElementAsReact: boolean
}

export interface Hash {
  [key: string]: any
}
