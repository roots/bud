import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
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
  cacheLocation: (app: Bud) => app.path(`@storage`, app.label, `modules`),
  frozen: false,
  lockfileLocation: (app: Bud): string => app.path(`bud.lock`),
  proxy: ({env}) => env.isString(`HTTP_PROXY`) && env.get(`HTTP_PROXY`),
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
   * Disable local caching of modules
   */
  @bind
  public disableCache(): this {
    this.cacheEnabled = false
    return this
  }

  /**
   * Allowed URIs getter/setter
   */
  public get allowedUris(): Set<
    string | RegExp | ((uri: string) => boolean)
  > {
    return this.getOption(`allowedUris`)
  }
  public set allowedUris(
    value: Set<string | RegExp | ((uri: string) => boolean)>,
  ) {
    this.setOption(`allowedUris`, value)
  }

  /**
   * Cache location getter/setter
   */
  public get cacheLocation(): string | false {
    return this.app.maybeCall(this.getOption(`cacheLocation`))
  }
  public set cacheLocation(
    value: string | false | Options['cacheLocation'],
  ) {
    this.setOption(`cacheLocation`, value)
  }

  /**
   * Frozen getter/setter
   */
  public get frozen(): boolean {
    return this.app.maybeCall(this.getOption(`frozen`))
  }
  public set frozen(value: boolean) {
    this.setOption(`frozen`, value)
  }

  /**
   * Lockfile location getter/setter
   */
  public get lockfileLocation(): string {
    return this.getOption(`lockfileLocation`)
  }
  public set lockfileLocation(
    value: string | Options['lockfileLocation'],
  ) {
    this.setOption(`lockfileLocation`, value)
  }

  /**
   * Proxy getter/setter
   */
  public get proxy(): string {
    return this.app.maybeCall(this.getOption(`proxy`))
  }
  public set proxy(value: string | Options['proxy']) {
    this.setOption(`proxy`, value)
  }

  /**
   * Upgrade location getter/setter
   */
  public get upgrade(): boolean {
    return this.app.maybeCall(this.getOption(`upgrade`))
  }
  public set upgrade(value: boolean | Options['upgrade']) {
    this.setOption(`upgrade`, value)
  }

  /**
   * Set allowed URLs
   */
  @bind
  public setAllowedUris(
    value: Set<string | RegExp | ((uri: string) => boolean)>,
  ): this {
    this.allowedUris = value
    return this
  }

  /**
   * Set cache location
   */
  @bind
  public setCacheLocation(value: string | Options['cacheLocation']): this {
    this.cacheLocation = value
    return this
  }

  /**
   * Freeze?
   */
  @bind
  public freeze(value?: boolean): this {
    this.frozen = !isUndefined(value) ? value : true
    return this
  }

  /**
   * Set lockfile location
   */
  @bind
  public setLockfileLocation(
    value: string | Options['lockfileLocation'],
  ): this {
    this.lockfileLocation = value
    return this
  }

  /**
   * Set proxy location
   */
  @bind
  public setProxy(value: string | Options['proxy']): this {
    this.proxy = value
    return this
  }

  /**
   * Set upgrade
   */
  @bind
  public setUpgrade(value: boolean | Options['upgrade']): this {
    this.upgrade = value
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
        ...(!bud.build.rules[key].include
          ? [bud.path()]
          : Array.isArray(bud.build.rules[key].include)
          ? bud.build.rules[key].include
          : []),
        ...Array.from(this.allowedUris),
      ])
    })

    const {NormalModuleReplacementPlugin} = await import(`webpack`).then(
      m => m.default,
    )

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
