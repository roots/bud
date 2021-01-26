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

  export namespace Package {
    export type Fetch = (useElementAsReact?: boolean) => Hash

    export type Transform = (hash: Hash) => Hash

    export type Reduce = (
      accumulated: Hash,
      current: string,
    ) => Hash

    export namespace Name {
      export type Transform = (name: string) => string
      export type Test = (name: string) => boolean
    }
  }
}
