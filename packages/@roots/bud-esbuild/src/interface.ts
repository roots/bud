import '@roots/bud-framework'

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

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.esbuild
     *
     * Configure ESBuild.
     */
    esbuild: ESBuild
  }

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
    setOptions: ESBuild.SetOptions

    /**
     * ## bud.esbuild.jsx
     *
     * Toggle esbuild jsx/tsx parsing
     *
     * ### Usage
     *
     * Disable:
     *
     * ```js
     * bud.esbuild.jsx(false)
     * ```
     */
    jsx: ESBuild.JSX
  }

  namespace ESBuild {
    type SetOptions = (
      type: 'js' | 'ts',
      opts: LoaderOptions,
    ) => Framework

    type JSX = (enabled?: boolean) => Framework
  }

  namespace Framework.Hooks.Loader {
    interface Definitions {
      esbuild: Subject
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      'esbuild-js': Subject
      'esbuild-ts': Subject
    }
  }

  namespace Framework.Hooks.Rule {
    interface Definitions {
      ts: Subject
    }
  }
}
