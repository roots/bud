/// <reference path="../../bud-framework/lib/index.d.ts" />
/// <reference path="../../bud-extensions/lib/index.d.ts" />
/// <reference path="../../bud-terser/lib/index.d.ts" />

import type * as Alias from './methods/alias/index.js'
import type * as Assets from './methods/assets/index.js'
import type * as Bundle from './methods/bundle/index.js'
import type * as Config from './methods/config/index.js'
import type * as Define from './methods/define/index.js'
import type * as Devtool from './methods/devtool/index.js'
import type * as Entry from './methods/entry/index.js'
import type * as Experiments from './methods/experiments/index.js'
import type * as Externals from './methods/externals/index.js'
import type * as Hash from './methods/hash/index.js'
import type * as Minimize from './methods/minimize/index.js'
import type * as Persist from './methods/persist/index.js'
import type * as Provide from './methods/provide/index.js'
import type * as Proxy from './methods/proxy/index.js'
import type * as Runtime from './methods/runtime/index.js'
import type * as Serve from './methods/serve/index.js'
import type * as SplitChunks from './methods/splitChunks/index.js'
import type * as Template from './methods/template/index.js'
import type * as Use from './methods/use/index.js'
import type * as Watch from './methods/watch/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    alias(...params: Alias.Parameters): Bud

    assets(...params: Assets.Parameters): Bud
    copy(...params: Assets.Parameters): Bud

    bundle(...params: Bundle.Parameters): Bud

    config(...params: Config.Parameters): Bud
    override(...params: Config.Parameters): Bud
    webpackConfig(...params: Config.Parameters): Bud

    define(...params: Define.Parameters): Bud
    devtool(...params: Devtool.Parameters): Bud

    entry(...params: Entry.Parameters): Bud
    experiments(...params: Experiments.Parameters): Bud
    externals(...params: Externals.Parameters): Bud

    hash(...params: Hash.Parameters): Bud
    version(...params: Hash.Parameters): Bud

    minimize(...params: Minimize.Parameters): Bud
    persist(...params: Persist.Parameters): Bud
    provide(...params: Provide.Parameters): Bud
    proxy(...params: Proxy.Parameters): Bud
    runtime(...params: Runtime.Parameters): Bud
    serve(...params: Serve.Parameters): Bud
    splitChunks(...params: SplitChunks.Parameters): Bud
    template(...params: Template.Parameters): Bud
    use(...params: Use.Parameters): Bud
    watch(...params: Watch.Parameters): Bud
  }
}
