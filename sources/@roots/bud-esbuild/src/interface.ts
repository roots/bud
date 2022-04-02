import {
  Extension,
  Framework,
  Item,
  Loader,
  Rule,
} from '@roots/bud-framework'

interface Esbuild extends Extension.Module<options> {
  name: '@roots/bud-esbuild'
  options: (app: Framework) => options
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-esbuild': Esbuild
  }

  interface Loaders {
    esbuild: Loader
  }

  interface Items {
    'esbuild-js': Item
    'esbuild-ts': Item
  }

  interface Rules {
    ts: Rule
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
