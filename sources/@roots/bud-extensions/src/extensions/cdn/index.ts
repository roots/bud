import type {Bud} from '@roots/bud-framework'

import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import Value from '@roots/bud-support/value'

/**
 * Http modules configuration options
 */
export type Options = {
  allowedUris?: Set<((uri: string) => boolean) | RegExp | string>
  cacheLocation: false | string
  frozen: boolean
  lockfileLocation: string
  proxy: string
  upgrade: boolean
}

type Api = StrictPublicExtensionApi<Cdn, Options>

/**
 * Http modules configuration
 */
@label(`@roots/bud-extensions/cdn`)
@expose(`cdn`)
@options<Options>({
  allowedUris: new Set([/^http:\/\//, /^https:\/\//]),
  cacheLocation: Value.make(({label, path}) =>
    path(`@storage`, label, `modules`),
  ),
  frozen: false,
  lockfileLocation: Value.make(({path}) => path(`bud.lock`)),
  proxy: Value.make(
    ({env}) => env.isString(`HTTP_PROXY`) && env.get(`HTTP_PROXY`),
  ),
  upgrade: true,
})
@disabled
export default class Cdn extends Extension<Options> implements Api {
  public declare allowedUris: Api['allowedUris']

  /**
   * Whether to cache modules locally
   */
  public cacheEnabled = true

  public declare cacheLocation: Api['cacheLocation']
  public declare frozen: Api['frozen']

  public declare getAllowedUris: Api['getAllowedUris']
  public declare getCacheLocation: Api['getCacheLocation']
  public declare getFrozen: Api['getFrozen']

  public declare getLockfileLocation: Api['getLockfileLocation']
  public declare getProxy: Api['getProxy']
  public declare getUpgrade: Api['getUpgrade']

  public declare lockfileLocation: Api['lockfileLocation']
  public declare proxy: Api['proxy']
  public declare setAllowedUris: Api['setAllowedUris']

  public declare setCacheLocation: Api['setCacheLocation']
  public declare setFrozen: Api['setFrozen']
  public declare setLockfileLocation: Api['setLockfileLocation']

  public declare setProxy: Api['setProxy']
  public declare setUpgrade: Api['setUpgrade']
  /**
   * CDN key to URL mapping
   */
  public sources = new Map<string, string>([
    [`gist`, `https://gist.githubusercontent.com/`],
    [`github`, `https://raw.githubusercontent.com/`],
    [`skypack`, `https://cdn.skypack.dev/`],
    [`unpkg`, `https://unpkg.com/`],
  ])

  public declare upgrade: Api['upgrade']
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
  @bind
  public disableCache(): this {
    this.cacheEnabled = false
    return this
  }

  /**
   * Enable cache
   */
  @bind
  public enableCache(enabled = true) {
    this.cacheEnabled = enabled
    return this
  }

  /**
   * Prevent bud from fetching updated modules
   */
  @bind
  public freeze(value?: boolean): this {
    this.setFrozen(!isUndefined(value) ? value : true)
    return this
  }
}
