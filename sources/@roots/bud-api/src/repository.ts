import type {Bud} from '@roots/bud-framework'

import type * as Alias from './methods/alias/index.js'
import type * as Assets from './methods/assets/index.js'
import type * as Bundle from './methods/bundle/index.js'
import type * as CompilePaths from './methods/compilePaths/index.js'
import type * as Config from './methods/config/index.js'
import type * as CopyDir from './methods/copyDir/index.js'
import type * as CopyFile from './methods/copyFile/index.js'
import type * as Define from './methods/define/index.js'
import type * as Devtool from './methods/devtool/index.js'
import type * as Entry from './methods/entry/index.js'
import type * as Experiments from './methods/experiments/index.js'
import type * as Externals from './methods/externals/index.js'
import type * as Hash from './methods/hash/index.js'
import type * as Html from './methods/html/index.js'
import type * as Minimize from './methods/minimize/index.js'
import type * as Persist from './methods/persist/index.js'
import type * as Provide from './methods/provide/index.js'
import type * as Proxy from './methods/proxy/index.js'
import type * as Runtime from './methods/runtime/index.js'
import type * as Serve from './methods/serve/index.js'
import type * as SetProxyUrl from './methods/setProxyUrl/index.js'
import type * as SetPublicProxyUrl from './methods/setPublicProxyUrl/index.js'
import type * as SetPublicUrl from './methods/setPublicUrl/index.js'
import type * as SetUrl from './methods/setUrl/index.js'
import type * as SplitChunks from './methods/splitChunks/index.js'
import type * as Use from './methods/use/index.js'
import type * as Watch from './methods/watch/index.js'

export interface Repository {
  /**
   * ## bud.alias
   *
   * {@link https://bud.js.org/docs/bud.alias 📕 Documentation}
   */
  alias: (...params: Alias.Parameters) => Bud

  /**
   * ## bud.assets
   *
   * {@link https://bud.js.org/docs/bud.assets 📕 Documentation}
   */
  assets: (...params: Assets.Parameters) => Bud

  /**
   * ## bud.copy
   *
   * Alias for {@link Assets.assets bud.assets}
   *
   * {@link https://bud.js.org/docs/bud.assets 📕 Documentation}
   */
  copy: (...params: Assets.Parameters) => Bud

  /**
   * ## bud.bundle
   *
   * {@link https://bud.js.org/docs/bud.bundle 📕 Documentation}
   */
  bundle(...params: Bundle.Parameters): Bud

  /**
   * ## bud.compilePaths
   *
   * {@link https://bud.js.org/docs/bud.compilePaths 📕 Documentation}
   */
  compilePaths(...params: CompilePaths.Parameters): Bud

  /**
   * ## bud.config
   *
   * {@link https://bud.js.org/docs/bud.config 📕 Documentation}
   */
  config(...params: Config.Parameters): Bud

  /**
   * ## bud.copyFile
   *
   * {@link https://bud.js.org/docs/bud.copyDir 📕 Documentation}
   */
  copyDir(...params: CopyDir.Parameters): Bud

  /**
   * ## bud.copyFile
   *
   * {@link https://bud.js.org/docs/bud.copyFile 📕 Documentation}
   */
  copyFile(...params: CopyFile.Parameters): Bud

  /**
   * ## bud.override
   *
   * Alias for {@link Config.config bud.config}
   *
   * {@link https://bud.js.org/docs/bud.config 📕 Documentation}
   */
  override(...params: Config.Parameters): Bud

  /**
   * ## bud.config
   *
   * Alias for {@link Config.config bud.config}
   *
   * {@link https://bud.js.org/docs/bud.config 📕 Documentation}
   */
  webpackConfig(...params: Config.Parameters): Bud

  /**
   * ## bud.define
   *
   * {@link https://bud.js.org/docs/bud.define 📕 Documentation}
   */
  define(...params: Define.Parameters): Bud

  /**
   * ## bud.devtool
   *
   * {@link https://bud.js.org/docs/bud.devtool 📕 Documentation}
   */
  devtool(...params: Devtool.Parameters): Bud

  /**
   * ## bud.entry
   *
   * Indicate application entrypoint(s)
   *
   * {@link https://bud.js.org/docs/bud.entry 📕 Documentation}
   *
   * @example
   * ```js
   * bud.entry('@src/index.js')
   * ```
   *
   * @example
   * ```js
   * bud.entry(['@src/index.js', '@src/another.js'])
   * ```
   *
   * @example
   * ```js
   * bud.entry('app', '@src/index.js')
   * ```
   *
   * @example
   * ```js
   * bud.entry({
   *   app: ['@src/index.js'],
   *   admin: ['@src/admin.js'],
   * })
   * ```
   */
  entry(...params: Entry.Parameters): Bud

  /**
   * ## bud.experiments
   *
   * {@link https://bud.js.org/docs/bud.experiments 📕 Documentation}
   */
  experiments(...params: Experiments.Parameters): Bud

  /**
   * ## bud.externals
   *
   * {@link https://bud.js.org/docs/bud.externals 📕 Documentation}
   */
  externals(...params: Externals.Parameters): Bud

  /**
   * ## bud.hash
   *
   * {@link https://bud.js.org/docs/bud.hash 📕 Documentation}
   */
  hash(...params: Hash.Parameters): Bud

  /**
   * ## bud.version
   *
   * {@link https://bud.js.org/docs/bud.version 📕 Documentation}
   */
  version(...params: Hash.Parameters): Bud

  /**
   * ## bud.minimize
   *
   * {@link https://bud.js.org/docs/bud.minimize 📕 Documentation}
   */
  minimize(...params: Minimize.Parameters): Bud

  /**
   * ## bud.persist
   *
   * {@link https://bud.js.org/docs/bud.persist 📕 Documentation}
   */
  persist(...params: Persist.Parameters): Bud

  /**
   * ## bud.provide
   *
   * {@link https://bud.js.org/docs/bud.provide 📕 Documentation}
   */
  provide(...params: Provide.Parameters): Bud

  /**
   * ## bud.proxy
   *
   * {@link https://bud.js.org/docs/bud.proxy 📕 Documentation}
   */
  proxy(...params: Proxy.Parameters): Bud

  /**
   * ## bud.runtime
   *
   * {@link https://bud.js.org/docs/bud.runtime 📕 Documentation}
   */
  runtime(...params: Runtime.Parameters): Bud

  /**
   * ## bud.serve
   *
   * {@link https://bud.js.org/docs/bud.serve 📕 Documentation}
   */
  serve(...params: Serve.Parameters): Bud

  /**
   * ## bud.setUrl
   *
   * {@link https://bud.js.org/docs/bud.setUrl 📕 Documentation}
   */
  setUrl(...params: SetUrl.Parameters): Bud

  /**
   * ## bud.setPublicUrl
   *
   * {@link https://bud.js.org/docs/bud.SetPublicUrl 📕 Documentation}
   */
  setPublicUrl(...params: SetPublicUrl.Parameters): Bud

  /**
   * ## bud.setProxyUrl
   *
   * {@link https://bud.js.org/docs/bud.setProxyUrl 📕 Documentation}
   */
  setProxyUrl(...params: SetProxyUrl.Parameters): Bud

  /**
   * ## bud.setPublicProxyUrl
   *
   * {@link https://bud.js.org/docs/bud.SetPublicProxyUrl 📕 Documentation}
   */
  setPublicProxyUrl(...params: SetPublicProxyUrl.Parameters): Bud

  /**
   * ## bud.splitChunks
   *
   * {@link https://bud.js.org/docs/bud.splitChunks 📕 Documentation}
   */
  splitChunks(...params: SplitChunks.Parameters): Bud

  /**
   * ## bud.html
   *
   * {@link https://bud.js.org/docs/bud.template 📕 Documentation}
   */
  html(...params: Html.Parameters): Bud

  /**
   * ## bud.template
   *
   * {@link https://bud.js.org/docs/bud.template 📕 Documentation}
   *
   * @deprecated use {@link Bud.html bud.html}
   */
  template(...params: Html.Parameters): Bud

  /**
   * ## bud.use
   *
   * {@link https://bud.js.org/docs/bud.use 📕 Documentation}
   */
  use(...params: Use.Parameters): Bud

  /**
   * ## bud.watch
   *
   * {@link https://bud.js.org/docs/bud.watch 📕 Documentation}
   */
  watch(...params: Watch.Parameters): Bud
}
