/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-api" />
/// <reference types="@roots/bud-build" />
/// <reference types="@roots/bud-cache" />
/// <reference types="@roots/bud-compiler" />
/// <reference types="@roots/bud-dashboard" />
/// <reference types="@roots/bud-entrypoints" />
/// <reference types="@roots/bud-extensions" />
/// <reference types="@roots/bud-hooks" />
/// <reference types="@roots/bud-support" />
/// <reference types="@roots/bud-server" />
/// <reference types="@roots/bud-terser" />

import '@roots/bud-api/types'
import '@roots/bud-build/types'
import '@roots/bud-cache/types'
import '@roots/bud-entrypoints/types'
import '@roots/bud-terser/types'

declare module '@roots/bud-framework' {
  interface Bud {}
}
