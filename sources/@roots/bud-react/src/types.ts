/// <reference path="../../bud-framework/lib/index.d.ts" />
/// <reference path="../../bud-babel/lib/index.d.ts" />
/// <reference path="../../bud-esbuild/lib/index.d.ts" />
/// <reference path="../../bud-swc/lib/index.d.ts" />
/// <reference path="../../bud-typescript/lib/index.d.ts" />

import type BudBabelRefresh from './babel-refresh/index.js'
import type BudReact from './extension/extension.js'
import type BudReactRefresh from './react-refresh/index.js'
import type BudSWCRefresh from './swc-refresh/index.js'
import type BudTypeScriptRefresh from './typescript-refresh/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    react: BudReact
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@roots/bud-react/babel-refresh': BudBabelRefresh
    '@roots/bud-react/react-refresh': BudReactRefresh
    '@roots/bud-react/swc-refresh': BudSWCRefresh
    '@roots/bud-react/typescript-refresh': BudTypeScriptRefresh
  }
}
