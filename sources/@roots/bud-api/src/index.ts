// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Extends bud.js with high-level facades to simplify common configuration tasks
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type * as Alias from '@roots/bud-api/methods/alias'
import type * as Assets from '@roots/bud-api/methods/assets'
import type * as Bundle from '@roots/bud-api/methods/bundle'
import type * as CompilePaths from '@roots/bud-api/methods/compilePaths'
import type * as Config from '@roots/bud-api/methods/config'
import type * as CopyDir from '@roots/bud-api/methods/copyDir'
import type * as CopyFile from '@roots/bud-api/methods/copyFile'
import type * as Define from '@roots/bud-api/methods/define'
import type * as Devtool from '@roots/bud-api/methods/devtool'
import type * as Entry from '@roots/bud-api/methods/entry'
import type * as Experiments from '@roots/bud-api/methods/experiments'
import type * as Externals from '@roots/bud-api/methods/externals'
import type * as Hash from '@roots/bud-api/methods/hash'
import type * as Html from '@roots/bud-api/methods/html'
import type * as Minimize from '@roots/bud-api/methods/minimize'
import type * as Persist from '@roots/bud-api/methods/persist'
import type * as Provide from '@roots/bud-api/methods/provide'
import type * as Proxy from '@roots/bud-api/methods/proxy'
import type * as Runtime from '@roots/bud-api/methods/runtime'
import type * as Serve from '@roots/bud-api/methods/serve'
import type * as SetProxyUrl from '@roots/bud-api/methods/setProxyUrl'
import type * as SetPublicProxyUrl from '@roots/bud-api/methods/setPublicProxyUrl'
import type * as SetPublicUrl from '@roots/bud-api/methods/setPublicUrl'
import type * as SetUrl from '@roots/bud-api/methods/setUrl'
import type * as SplitChunks from '@roots/bud-api/methods/splitChunks'
import type * as Use from '@roots/bud-api/methods/use'
import type * as Watch from '@roots/bud-api/methods/watch'

import {default as Service} from '@roots/bud-api/service'

declare module '@roots/bud-framework' {
  interface Bud {
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
     * ## bud.copy
     *
     * Alias for {@link Assets.assets bud.assets}
     *
     * {@link https://bud.js.org/docs/bud.assets 📕 Documentation}
     */
    copy: (...params: Assets.Parameters) => Bud

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
     * ## bud.html
     *
     * {@link https://bud.js.org/docs/bud.template 📕 Documentation}
     */
    html(...params: Html.Parameters): Bud

    /**
     * @roots/bud-minify
     */
    minify: import('@roots/bud-minify').default

    /**
     * ## bud.minimize
     *
     * {@link https://bud.js.org/docs/bud.minimize 📕 Documentation}
     */
    minimize(...params: Minimize.Parameters): Bud

    /**
     * ## bud.override
     *
     * Alias for {@link Config.config bud.config}
     *
     * {@link https://bud.js.org/docs/bud.config 📕 Documentation}
     */
    override(...params: Config.Parameters): Bud

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
     * ## bud.setPublicUrl
     *
     * {@link https://bud.js.org/docs/bud.SetPublicUrl 📕 Documentation}
     */
    setPublicUrl(...params: SetPublicUrl.Parameters): Bud

    /**
     * ## bud.setUrl
     *
     * {@link https://bud.js.org/docs/bud.setUrl 📕 Documentation}
     */
    setUrl(...params: SetUrl.Parameters): Bud

    /**
     * ## bud.splitChunks
     *
     * {@link https://bud.js.org/docs/bud.splitChunks 📕 Documentation}
     */
    splitChunks(...params: SplitChunks.Parameters): Bud

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
     * ## bud.version
     *
     * {@link https://bud.js.org/docs/bud.version 📕 Documentation}
     */
    version(...params: Hash.Parameters): Bud

    /**
     * ## bud.watch
     *
     * {@link https://bud.js.org/docs/bud.watch 📕 Documentation}
     */
    watch(...params: Watch.Parameters): Bud

    /**
     * ## bud.config
     *
     * Alias for {@link Config.config bud.config}
     *
     * {@link https://bud.js.org/docs/bud.config 📕 Documentation}
     */
    webpackConfig(...params: Config.Parameters): Bud
  }

  type Api = Service

  interface Services {
    api: Service
    extensions: import('@roots/bud-extensions').default
  }
}

export {Service as default}
