import '@roots/bud'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.wordpressExternals  [💁 Fluent]
     *
     * Configure wordpress externals plugin
     *
     * ### Usage
     *
     * ```js
     * bud.wordpressExternals({
     *   name: 'wordpress.json',
     *   writeToFileEmit: true,
     *   useElementAsReact: true,
     * })
     * ```
     *
     * Multiple modules can be added at once by passing an array
     *
     * ```js
     * bud.wordpressExternals(['react', 'react-dom'])
     * ```
     */
    wordpressExternals: Bud.WordPressExternals.Configure
  }

  namespace Bud {
    export namespace WordPressExternals {
      export type Configure = (
        this: Bud,
        options: {
          /**
           * Name of outputted file.
           *
           * @default wordpress.json
           */
          name: string

          /**
           * Should externals manifest be written to disk.
           *
           * @default true
           */
          writeToFileEmit: boolean

          /**
           * Transform requests for 'react' and 'react-dom' to '@wordpress/element'
           *
           * @default true
           */
          useElementAsReact: boolean
        },
      ) => Bud
    }
  }
}
