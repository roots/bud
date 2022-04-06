import type {Bud, Index} from '@roots/bud-framework'

interface Options {
  rehypePlugins: any[]
  remarkPlugins: any[]
}

class MdxConfig implements MdxConfig {
  public _app: () => Bud

  /**
   * Get registered remark plugins.
   */
  public remarkPlugins: Index<any> = {}

  /**
   * Get registered rehype plugins.
   */
  public rehypePlugins: Index<any> = {}

  public constructor(app: Bud) {
    this._app = () => app
  }

  public get app() {
    return this._app()
  }

  public get options(): Options {
    return {
      remarkPlugins: Object.values(this.remarkPlugins),
      rehypePlugins: Object.values(this.rehypePlugins),
    }
  }

  public set options(options: Options) {
    this.remarkPlugins = options.remarkPlugins
    this.rehypePlugins = options.rehypePlugins
  }
}

export {MdxConfig}
