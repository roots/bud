import type {Context} from '@roots/bud-framework/config'
import {bind} from 'helpful-decorators'

export default class Extensions {
  public data: Array<string> = []

  public constructor(public manifest: Context['manifest']) {}

  @bind
  public async find() {
    this.filterApplicableExtensions(
      Object.keys({
        ...(this.manifest?.devDependencies ?? {}),
        ...(this.manifest?.dependencies ?? {}),
      }),
    )

    return this
  }

  @bind
  public filterApplicableExtensions(extensions: Array<string>) {
    extensions
      .filter(
        signifier =>
          signifier.startsWith('@roots/bud') ||
          signifier.startsWith('@roots/sage') ||
          signifier.startsWith('bud'),
      )
      .filter(
        signifier =>
          ![
            '@roots/bud',
            '@roots/bud-api',
            '@roots/bud-build',
            '@roots/bud-cache',
            '@roots/bud-client',
            '@roots/bud-compiler',
            '@roots/bud-dashboard',
            '@roots/bud-extensions',
            '@roots/bud-framework',
            '@roots/bud-hooks',
            '@roots/bud-server',
          ].includes(signifier),
      )
      .filter(
        signifier =>
          !this.manifest.bud?.denylist ||
          !this.manifest.bud?.denylist.includes(signifier),
      )
      .filter(
        signifier =>
          !this.manifest.bud?.allowlist ||
          this.manifest.bud?.allowlist.includes(signifier),
      )
      .map(signifier => this.data.push(signifier))
  }
}
