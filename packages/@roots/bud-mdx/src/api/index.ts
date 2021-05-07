import {Mdx, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'

export class MdxConfig implements Mdx {
  protected _app: Framework['get']
  protected _remarkPlugins: Mdx.RemarkRegistry = {}
  protected _rehypePlugins: Mdx.RehypeRegistry = {}

  public constructor(app: Framework) {
    this._app = app.get
  }

  public get app() {
    return this._app()
  }

  public get remarkPlugins() {
    return this._remarkPlugins
  }

  public set remarkPlugins(plugins) {
    this._remarkPlugins = plugins
  }

  public get rehypePlugins() {
    return this._rehypePlugins
  }

  public set rehypePlugins(plugins) {
    this._rehypePlugins = plugins
  }

  public get options(): Mdx.Options {
    return {
      remarkPlugins: Object.values(this.remarkPlugins),
      rehypePlugins: Object.values(this.rehypePlugins),
    }
  }

  public set options(options: Mdx.Options) {
    this._remarkPlugins = options.remarkPlugins
    this._rehypePlugins = options.rehypePlugins
  }

  @bind
  public setRemarkPlugin(plugin: Mdx.RemarkRegistry) {
    this.remarkPlugins = {
      ...this.remarkPlugins,
      ...plugin,
    }

    return this
  }

  @bind
  public unsetRemarkPlugin(plugin: string) {
    delete this.remarkPlugins[plugin]

    return this
  }

  @bind
  public setRehypePlugin(plugin: Mdx.RehypeRegistry) {
    this.rehypePlugins = {
      ...this.rehypePlugins,
      ...plugin,
    }

    return this
  }

  @bind
  public unsetRehypePlugin(plugin: string) {
    delete this.rehypePlugins[plugin]

    return this
  }
}
