import type {Modules} from '@roots/bud-framework'
import type {Context} from '@roots/bud-framework/options'
import {bind} from '@roots/bud-support/decorators'

import {noDiscovery} from './argv.js'

const CORE_MODULES = [
  `@roots/bud-api`,
  `@roots/bud-build`,
  `@roots/bud-cache`,
  `@roots/bud-client`,
  `@roots/bud-compiler`,
  `@roots/bud-dashboard`,
  `@roots/bud-extensions`,
  `@roots/bud-framework`,
  `@roots/bud-hooks`,
  `@roots/bud-server`,
]

export default class Extensions {
  /**
   * Builtin extensions
   */
  public builtIn: Partial<Array<keyof Modules & string>> = [
    `@roots/bud-terser`,
    `@roots/bud-extensions/cdn`,
    `@roots/bud-extensions/esm`,
    `@roots/bud-extensions/fix-style-only-entrypoints`,
    `@roots/bud-extensions/clean-webpack-plugin`,
    `@roots/bud-extensions/copy-webpack-plugin`,
    `@roots/bud-extensions/html-webpack-plugin`,
    `@roots/bud-extensions/interpolate-html-webpack-plugin`,
    `@roots/bud-extensions/mini-css-extract-plugin`,
    `@roots/bud-extensions/webpack-define-plugin`,
    `@roots/bud-extensions/webpack-hot-module-replacement-plugin`,
    `@roots/bud-extensions/webpack-manifest-plugin`,
    `@roots/bud-extensions/webpack-provide-plugin`,
  ]

  /**
   * Discovered extensions
   *
   * @public
   */
  public discovered: Partial<Array<keyof Modules & string>> = []

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public manifest: Context['manifest']) {}

  @bind
  public async find(): Promise<Extensions> {
    if (noDiscovery) return this

    Object.keys({
      ...(this.manifest?.devDependencies ?? {}),
      ...(this.manifest?.dependencies ?? {}),
    })
      .filter(
        signifier =>
          signifier.startsWith(`@roots/bud-`) ||
          signifier.startsWith(`@roots/sage`) ||
          signifier.startsWith(`bud-`),
      )
      .filter(
        signifier =>
          !CORE_MODULES.some(coreSignifier => signifier === coreSignifier),
      )
      .filter(
        signifier =>
          !this.manifest.bud?.denylist ||
          !this.manifest.bud.denylist.includes(signifier),
      )
      .filter(
        signifier =>
          !this.manifest.bud?.allowlist ||
          this.manifest.bud.allowlist.includes(signifier),
      )
      .map((signifier: keyof Modules & string) =>
        this.discovered.push(signifier),
      )

    return this
  }
}
