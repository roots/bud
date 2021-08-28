import type {Framework} from '@roots/bud-framework'

interface Options {
  rehypePlugins: any[]
  remarkPlugins: any[]
}

class MdxConfig implements MdxConfig {
  public _app: () => Framework

  /**
   * Get registered remark plugins.
   */
  public remarkPlugins: Framework.Index<any> = {}

  /**
   * Get registered rehype plugins.
   */
  public rehypePlugins: Framework.Index<any> = {}

  public constructor(app: Framework) {
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
