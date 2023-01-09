/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-babel" />
/// <reference types="@roots/bud-esbuild" />
/// <reference types="@roots/bud-swc" />
/// <reference types="@roots/bud-typescript" />

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
