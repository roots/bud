import type { Framework } from '@roots/bud-framework';
export declare class MdxConfig implements Framework.Api.Mdx {
    _app: () => Framework;
    remarkPlugins: Framework.Api.Mdx.RemarkRegistry;
    rehypePlugins: Framework.Api.Mdx.RehypeRegistry;
    constructor(app: Framework);
    get app(): Framework;
    get options(): Framework.Api.Mdx.Options;
    set options(options: Framework.Api.Mdx.Options);
}
//# sourceMappingURL=index.d.ts.map