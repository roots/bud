import {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {isFunction, isUndefined} from 'lodash-es'
import Webpack from 'webpack'

/**
 * `esm-http` extension options
 *
 * @public
 */
export interface Options {
  allowedUris?: (
    app: Bud,
  ) => Array<string | RegExp | ((uri: string) => boolean)>
  cacheLocation: (app: Bud) => false | string
  frozen: (app: Bud) => boolean
  lockfileLocation: (app: Bud) => string
  proxy: (app: Bud) => string
  upgrade: (app: Bud) => boolean
}

/**
 * Extension enabling remote module caching, version locking, etc.
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@options`
 */
@label('esm-http')
@expose('http')
@options<Options>({
  allowedUris: () => ['https://cdn.skypack.dev/'],
  cacheLocation: () => (app: Bud) =>
    app.path('@storage', app.name, 'modules'),
  frozen: () => false,
  lockfileLocation: (app: Bud): string =>
    app.path('@storage', app.name, 'bud.lock'),
  proxy: (app: Bud) => app.env.get('HTTP_PROXY'),
  upgrade: (app: Bud) => true,
})
export default class Http extends Extension<Options, null> {
  /**
   * CDN mapping
   *
   * @public
   */
  public cdn = new Map([['skypack', 'https://cdn.skypack.dev/']])

  /**
   * Register CDN
   *
   * @public
   */
  public registerCdn(name: string, url: string): this {
    this.cdn.set(name, url)
    this.setOption(
      'allowedUris',
      // @ts-ignore
      (uris: Array<string>): Array<string> => [...(uris ?? []), url],
    )

    return this
  }

  /**
   * Allowed URIs getter/setter
   *
   * @public
   */
  public get allowedUris(): Array<
    string | RegExp | ((uri: string) => boolean)
  > {
    return this.app.maybeCall(this.getOption('allowedUris'))
  }
  public set allowedUris(
    value:
      | Array<string | RegExp | ((uri: string) => boolean)>
      | Options['allowedUris'],
  ) {
    this.setOption('allowedUris', isFunction(value) ? value : () => value)
  }

  /**
   * Cache location getter/setter
   *
   * @public
   */
  public get cacheLocation(): string | false {
    return this.app.maybeCall(this.getOption('cacheLocation'))
  }
  public set cacheLocation(
    value: string | false | Options['cacheLocation'],
  ) {
    this.setOption(
      'cacheLocation',
      isFunction(value) ? value : () => value,
    )
  }

  /**
   * Frozen getter/setter
   *
   * @public
   */
  public get frozen(): boolean {
    return this.app.maybeCall(this.getOption('frozen'))
  }
  public set frozen(value: boolean) {
    this.setOption('frozen', isFunction(value) ? value : () => value)
  }

  /**
   * Lockfile location getter/setter
   *
   * @public
   */
  public get lockfileLocation(): string {
    return this.app.maybeCall(this.getOption('lockfileLocation'))
  }
  public set lockfileLocation(
    value: string | Options['lockfileLocation'],
  ) {
    this.setOption(
      'lockfileLocation',
      isFunction(value) ? value : () => value,
    )
  }

  /**
   * Proxy getter/setter
   *
   * @public
   */
  public get proxy(): string {
    return this.app.maybeCall(this.getOption('proxy'))
  }
  public set proxy(value: string | Options['proxy']) {
    this.setOption('proxy', isFunction(value) ? value : () => value)
  }

  /**
   * Upgrade location getter/setter
   *
   * @public
   */
  public get upgrade(): boolean {
    return this.app.maybeCall(this.getOption('upgrade'))
  }
  public set upgrade(value: boolean | Options['upgrade']) {
    this.setOption('upgrade', isFunction(value) ? value : () => value)
  }

  /**
   * Set allowed URLs
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setAllowedUris(
    value:
      | Array<string | RegExp | ((uri: string) => boolean)>
      | Options['allowedUris'],
  ): this {
    this.allowedUris = value
    return this
  }

  /**
   * Set cache location
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setCacheLocation(value: string | Options['cacheLocation']): this {
    this.cacheLocation = value
    return this
  }

  /**
   * Freeze?
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public freeze(value?: boolean): this {
    this.frozen = !isUndefined(value) ? value : true
    return this
  }

  /**
   * Set lockfile location
   *
   * @public
   * @decorator `@bind`
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
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setProxy(value: string | Options['proxy']): this {
    this.proxy = value
    return this
  }

  /**
   * Set upgrade
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setUpgrade(value: boolean | Options['upgrade']): this {
    this.upgrade = value
    return this
  }

  @bind
  public async register() {
    for (const cdnKey of this.cdn.keys()) {
      if (this.app.project.has(`manifest.${cdnKey}`)) this.enable()
    }
  }

  /**
   * `beforeBuild` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async beforeBuild() {
    this.app.hooks.on('build.experiments.buildHttp', () => ({
      allowedUris: this.allowedUris,
      cacheLocation: this.cacheLocation,
      frozen: this.frozen,
      lockfileLocation: this.lockfileLocation,
      proxy: this.proxy,
      upgrade: this.upgrade,
    }))

    for (const [cdnKey, cdnUrl] of this.cdn.entries()) {
      if (!this.app.project.has(`manifest.${cdnKey}`)) break

      await this.app.extensions.add({
        label: `budpack-${cdnKey}`,
        make: async () =>
          new Webpack.NormalModuleReplacementPlugin(
            RegExp(`${cdnKey}:(\\.*)`),
            resource => {
              resource.request = resource.request.replace(
                RegExp(`${cdnKey}:`),
                cdnUrl,
              )
            },
          ),
      })

      const manifest = this.app.project.get(`manifest.${cdnKey}`)

      const imports = Array.isArray(manifest)
        ? manifest.map(signifier => [signifier, signifier])
        : Object.entries(manifest).map(([signifier, version]) => [
            signifier,
            `${signifier}@${version}`,
          ])

      await Promise.all(
        imports.map(async ([signifier, resolution]) => {
          await this.app.extensions.add({
            label: `budpack-${cdnKey}-${resolution}`,
            make: async () =>
              new Webpack.NormalModuleReplacementPlugin(
                RegExp(signifier),
                resource => {
                  resource.request = `${cdnUrl}${resolution}`
                },
              ),
          })
        }),
      )
    }
  }

  /**
   * `when` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async when() {
    return false
  }
}
