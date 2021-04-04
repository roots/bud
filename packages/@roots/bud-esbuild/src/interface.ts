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

  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-esbuild': Framework.Module
      '@roots/bud-esbuild/js': Framework.Module
      '@roots/bud-esbuild/ts': Framework.Module
      'esbuild-plugin': Framework.Module
    }
  }

  namespace Framework.Hooks.Loader {
    interface Definitions {
      'esbuild-js': Framework.Hooks.Loader.Subject
      'esbuild-ts': Framework.Hooks.Loader.Subject
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      'esbuild-js': Framework.Hooks.Item.Subject
      'esbuild-ts': Framework.Hooks.Item.Subject
    }
  }

  namespace Framework.Hooks.Rule {
    interface Definitions {
      ts: Framework.Hooks.Rule.Subject
    }
  }
}
