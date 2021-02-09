import '@roots/bud'

interface LoaderOptions {
  target?:
    | 'es2015'
    | 'es2020'
    | 'chrome58'
    | 'firefox57'
    | 'safari11'
    | 'edge16'
    | 'node12.19.0'
  loader?:
    | 'tsx'
    | 'ts'
    | 'js'
    | 'json'
    | 'text'
    | 'base64'
    | 'file'
    | 'dataurl'
    | 'binary'
  jsxFactory?: string
  jsxFragment?: string
}

declare module '@roots/bud' {
  export interface Bud {
    /**
     * ## bud.esbuild
     *
     * Configure ESBuild.
     */
    esbuild: Bud.ESBuild
  }

  export namespace Bud {
    interface ESBuild {
      /**
       * ## bud.esbuild.setOptions
       *
       * Configure esbuild-loader options
       *
       * ### Usage
       *
       * ```js
       * bud.babel.setOptions({
       *  target: 'es2020',
       * })
       * ```
       */
      setOptions: Bud.ESBuild.SetOptions
    }

    export namespace ESBuild {
      export type SetOptions = (opts?: LoaderOptions) => Bud
    }
  }
}
