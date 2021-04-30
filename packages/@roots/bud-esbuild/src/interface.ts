import '@roots/bud-extensions'

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
  }

  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-esbuild': Module
      '@roots/bud-esbuild/js': Module
      '@roots/bud-esbuild/ts': Module
      'esbuild-plugin': Module
    }
  }

  namespace Hooks.Loader {
    interface Definitions {
      'esbuild-js': string
      'esbuild-ts': string
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      'esbuild-js': any
      'esbuild-ts': any
    }
  }

  namespace Hooks.Rule {
    interface Definitions {
      ts: any
    }
  }
}
