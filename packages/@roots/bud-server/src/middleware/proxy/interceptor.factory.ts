import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import {URL} from './url'

export class InterceptorFactory {
  public get app() {
    return this._app()
  }

  public constructor(
    public _app: () => Framework,
    public url: URL,
  ) {}

  public async _interceptor(
    buffer: Buffer,
  ): Promise<string | Buffer> {
    const response = buffer?.toString('utf8')

    return !response
      ? buffer
      : this.replacements.reduce(
          (
            html: string,
            [from, to]: [string | RegExp, string],
          ) => html.replaceAll(from, to),
          response,
        )
  }

  public get _replacements() {
    const replacements = []

    if (
      this.url.hasPublicPath &&
      this.app.store.is('server.proxy.replace.publicPath', true)
    ) {
      replacements.push([
        `${this.url.proxy.origin}${this.url.publicPath}`,
        `${this.url.dev.origin}${this.url.publicPath}`,
      ])
    }

    if (this.app.store.is('server.proxy.replace.href', true)) {
      replacements.push(this.replaceHref)
    }

    if (this.url.config.proxy.replace.window == true) {
      replacements.push(this.replaceWindow)
    }

    return replacements
  }

  @bind
  public make(): (buffer: Buffer) => Promise<string | Buffer> {
    return this.app.hooks.filter(
      'proxy.interceptor',
      this._interceptor,
    )
  }

  public get replacements() {
    return this.app.hooks.filter(
      'proxy.replace',
      this._replacements,
    )
  }

  @bind
  public replaceWindow(): [string | RegExp, string] {
    return [
      new RegExp(
        `window\\.location([\\[|\\.]['|"]?.*['|"]?\\]?)\\s*?=\\s*?['|"]${this.url.proxy.origin}(.*)['|"]`,
        'g',
      ),
      `window.location$1 = "${this.url.dev.origin}$2"`,
    ]
  }

  @bind
  public replaceHref(): [string | RegExp, string] {
    return [
      new RegExp(
        `<a(.*)?href=['|"]${this.url.proxy.origin}(.*)?['|"]`,
        'g',
      ),
      `<a$1href="${this.url.dev.origin}$2"`,
    ]
  }
}
