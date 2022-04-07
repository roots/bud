import {Bud, Build, Extension} from '@roots/bud-framework'

interface Esbuild extends Extension.Module<options> {
  name: '@roots/bud-esbuild'
  options: (app: Bud) => options
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-esbuild': Esbuild
  }

  interface Loaders {
    esbuild: Build.Loader
  }

  interface Items {
    'esbuild-js': Build.Item
    'esbuild-ts': Build.Item
  }

  interface Rules {
    ts: Build.Rule
  }
}

interface options {
  minify: {
    css: boolean
    include: string | RegExp | Array<string | RegExp>
    exclude: string | RegExp | Array<string | RegExp>
  }
  js: {
    loader: 'jsx' | 'jsx'
    target: string
  }
  ts: {
    loader: 'tsx' | 'ts'
    target: string
    tsconfigRaw: Record<string, any>
  }
}
