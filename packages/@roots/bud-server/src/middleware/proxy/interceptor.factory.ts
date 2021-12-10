import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {responseInterceptor} from 'http-proxy-middleware'

import {URL} from './url'

export class InterceptorFactory {
  public get app() {
    return this._app()
  }

  public constructor(
    public _app: () => Framework,
    public url: URL,
  ) {}

  @bind
  public async _interceptor(
    buffer: Buffer,
  ): Promise<string | Buffer> {
    try {
      const response = buffer?.toString('utf8')

      return !response
        ? buffer
        : this.replacements?.reduce(
            (html, [from, to]: [string | RegExp, string]) =>
              html.replaceAll(from, to),
            response,
          ) ?? buffer
    } catch (err) {
      return buffer
    }
  }

  @bind
  public make() {
    return responseInterceptor(
      this.app.hooks.filter(
        'proxy.interceptor',
        () => this._interceptor,
      ),
    )
  }

  public get replacements() {
    const replacements = [this.replaceAssetPath()]

    if (this.app.store.is('server.proxy.replace.href', true)) {
      replacements.push(this.replaceHref())
    }

    if (this.app.store.is('server.proxy.replace.href', true)) {
      replacements.push(this.replaceWindow())
    }

    return this.app.hooks.filter('proxy.replace', replacements)
  }

  @bind
  public replaceAssetPath(): [string | RegExp, string] {
    return [
      new RegExp(
        `${this.url.proxy.origin}${this.url.publicPath}(.*)?`,
        'g',
      ),
      `${this.url.dev.origin}/$1`,
    ]
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
