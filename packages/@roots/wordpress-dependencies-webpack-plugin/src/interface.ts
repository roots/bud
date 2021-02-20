declare namespace WordPressExternals {
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

  export interface Hash {
    [key: string]: any
  }
}
