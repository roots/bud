import {
  LoaderOptions,
  CustomResolveModuleName,
  CustomResolveTypeReferenceDirective,
  ErrorInfo,
} from 'ts-loader/dist/interfaces'
import * as typescript from 'typescript'
import {chalk} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.typscript
     *
     * Modify typescript options
     *
     * ### Usage
     *
     * See ts-loader for documentation on what you can configure here.
     *
     * ```js
     * bud.typescript({
     *  allowTsInNodeModules: true
     * })
     * ```
     */
    typescript: Framework.Typescript.Config
  }

  namespace Framework.Typescript {
    export type Options = Partial<LoaderOptions> | LoaderOptions

    /**
     * Make.
     */
    export type Config = (options: {
      silent: boolean
      logLevel: LoaderOptions['logLevel']
      logInfoToStdOut: boolean
      instance: string
      compiler: string
      configFile: string
      context: string
      transpileOnly: boolean
      ignoreDiagnostics: number[]
      reportFiles: string[]
      errorFormatter: (
        message: ErrorInfo,
        colors: typeof chalk,
      ) => string
      onlyCompileBundledFiles: boolean
      colors: boolean
      compilerOptions: LoaderOptions['compilerOptions']
      appendTsSuffixTo: (RegExp | string)[]
      appendTsxSuffixTo: (RegExp | string)[]
      happyPackMode: boolean
      getCustomTransformers:
        | string
        | ((
            program: typescript.Program,
          ) => typescript.CustomTransformers | undefined)
      experimentalWatchApi: boolean
      allowTsInNodeModules: boolean
      experimentalFileCaching: boolean
      projectReferences: boolean
      resolveModuleName: CustomResolveModuleName
      resolveTypeReferenceDirective: CustomResolveTypeReferenceDirective
      useCaseSensitiveFileNames?: boolean
    }) => Framework
  }
}
