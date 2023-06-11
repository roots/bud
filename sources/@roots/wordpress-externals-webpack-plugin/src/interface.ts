/**
 * WordPress externals plugin
 */
export type Output = {
  content: Content
  dir: string
  file: string
  name: string
  publicPath: string
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
   * Transform requests for 'react' and 'react-dom'
   * to `@wordpress/element`
   */
  useElementAsReact: boolean

  /**
   * Should manifest be written to disk.
   */
  writeToFileEmit: boolean
}

export interface Hash {
  [key: string]: any
}
