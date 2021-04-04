import {Mdx, Framework} from '@roots/bud-framework'

/**
 * MDXConfig
 */
export class MdxConfig implements Mdx {
  public app: Framework

  public _remarkPlugins: Mdx.RemarkRegistry = {}
  public _rehypePlugins: Mdx.RehypeRegistry = {}

  public constructor({app}: {app: Framework}) {
    this.app = app

    this.setRehypePlugin = this.setRehypePlugin.bind(this)
    this.unsetRehypePlugin = this.unsetRehypePlugin.bind(this)
    this.setRemarkPlugin = this.setRemarkPlugin.bind(this)
    this.unsetRemarkPlugin = this.unsetRemarkPlugin.bind(this)
  }

  public setRemarkPlugin(plugin: Mdx.RemarkRegistry) {
    this.remarkPlugins = {
      ...this.remarkPlugins,
      ...plugin,
    }

    return this
  }

  public unsetRemarkPlugin(plugin: string) {
    delete this.remarkPlugins[plugin]

    return this
  }

  public setRehypePlugin(plugin: Mdx.RehypeRegistry) {
    this.rehypePlugins = {
      ...this.rehypePlugins,
      ...plugin,
    }

    return this
  }

  public unsetRehypePlugin(plugin: string) {
    delete this.rehypePlugins[plugin]

    return this
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

  public get options() {
    return {
      remarkPlugins: Object.values(this.remarkPlugins),
      rehypePlugins: Object.values(this.rehypePlugins),
    }
  }
}
