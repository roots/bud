import type {Framework} from '@roots/bud-framework'

export class MdxConfig implements Framework.Api.Mdx {
  public _app: () => Framework

  public remarkPlugins: Framework.Api.Mdx.RemarkRegistry = {}

  public rehypePlugins: Framework.Api.Mdx.RehypeRegistry = {}

  public constructor(app: Framework) {
    this._app = () => app
  }

  public get app() {
    return this._app()
  }

  public get options(): Framework.Api.Mdx.Options {
    return {
      remarkPlugins: Object.values(this.remarkPlugins),
      rehypePlugins: Object.values(this.rehypePlugins),
    }
  }

  public set options(options: Framework.Api.Mdx.Options) {
    this.remarkPlugins = options.remarkPlugins
    this.rehypePlugins = options.rehypePlugins
  }
}
