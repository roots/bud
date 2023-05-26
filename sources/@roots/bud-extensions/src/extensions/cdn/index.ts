import type {Bud} from '@roots/bud-framework'
import {Extension, type OptionsMap} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-framework/value'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * Http modules configuration options
 */
export interface Options {
  allowedUris?: Set<string | RegExp | ((uri: string) => boolean)>
  cacheLocation: false | string
  frozen: boolean
  lockfileLocation: string
  proxy: string
  upgrade: boolean
}

/**
 * Http modules configuration
 */
@label(`@roots/bud-extensions/cdn`)
@expose(`cdn`)
@options<Options>({
  allowedUris: new Set([/^http:\/\//, /^https:\/\//]),
  cacheLocation: new Value(({label, path}) =>
    path(`@storage`, label, `modules`),
  ),
  frozen: false,
  lockfileLocation: new Value(({path}) => path(`bud.lock`)),
  proxy: new Value(
    ({env}) => env.isString(`HTTP_PROXY`) && env.get(`HTTP_PROXY`),
  ),
  upgrade: true,
})
@disabled
export default class Cdn extends Extension<Options, null> {
  /**
   * CDN key to URL mapping
   */
  public sources = new Map<string, string>([
    [`gist`, `https://gist.githubusercontent.com/`],
    [`github`, `https://raw.githubusercontent.com/`],
    [`unpkg`, `https://unpkg.com/`],
    [`skypack`, `https://cdn.skypack.dev/`],
  ])

  /**
   * Whether to cache modules locally
   */
  public cacheEnabled = true

  /**
   * Enable cache
   */
  @bind
  public enableCache(enabled = true) {
    this.cacheEnabled = enabled
    return this
  }
  @bind
  public disableCache(): this {
    this.cacheEnabled = false
    return this
  }

  public declare cacheLocation: Options['cacheLocation']
  public declare getCacheLocation: () => Options['cacheLocation']
  public declare setCacheLocation: (
    location: OptionsMap<Options>['cacheLocation'],
  ) => this

  public declare frozen: Options['frozen']
  public declare getFrozen: () => Options['frozen']
  public declare setFrozen: (location: Options['frozen']) => this

  public declare lockfileLocation: Options['lockfileLocation']
  public declare getLockfileLocation: () => Options['lockfileLocation']
  public declare setLockfileLocation: (
    location: OptionsMap<Options>['lockfileLocation'],
  ) => this

  public declare proxy: Options['proxy']
  public declare getProxy: () => Options['proxy']
  public declare setProxy: (location: OptionsMap<Options>['proxy']) => this

  public declare upgrade: Options['upgrade']
  public declare getUpgrade: () => Options['upgrade']
  public declare setUpgrade: (
    upgrade: OptionsMap<Options>['upgrade'],
  ) => this

  public declare allowedUris: Options['allowedUris']
  public declare getAllowedUris: () => Options['allowedUris']
  public declare setAllowedUris: (
    allowedUris: OptionsMap<Options>['allowedUris'],
  ) => this

  /**
   * Prevent bud from fetching updated modules
   */
  @bind
  public freeze(value?: boolean): this {
    this.frozen = !isUndefined(value) ? value : true
    return this
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    bud.hooks.on(`build.experiments`, experiments => ({
      ...(experiments ?? {}),
      buildHttp: {
        allowedUris: Array.from(this.allowedUris),
        cacheLocation: this.cacheEnabled ? this.cacheLocation : false,
        frozen: this.frozen,
        lockfileLocation: this.lockfileLocation,
        proxy: isString(this.proxy) ? this.proxy : undefined,
        upgrade: this.upgrade,
      },
    }))

    Object.entries(bud.build.rules).map(([key, rule]) => {
      if (key === `js` || key === `ts`) return

      rule.setInclude([
        ...(!rule.include
          ? [bud.path()]
          : Array.isArray(rule.include)
          ? rule.include
          : []),
        ...Array.from(this.allowedUris),
      ])
    })

    const NormalModuleReplacementPlugin = await import(
      `webpack/lib/NormalModuleReplacementPlugin.js`
    ).then(m => m.default)

    for (const [ident, url] of this.sources.entries()) {
      await bud.extensions.add({
        make: async () =>
          new NormalModuleReplacementPlugin(
            new RegExp(`^${ident}:`),
            result => {
              result.request = result.request.replace(`${ident}:`, url)
            },
          ),
      } as any)

      await Promise.all(
        (bud.context.manifest?.bud?.imports?.[ident] ?? []).map(
          async ([signifier, remote]) => {
            await bud.extensions.add({
              make: async () =>
                new NormalModuleReplacementPlugin(
                  new RegExp(`^${signifier}`),
                  `${url}${remote}`,
                ),
            })
          },
        ),
      )
    }
  }
}
