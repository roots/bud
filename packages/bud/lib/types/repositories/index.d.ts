/**
 * Repositories
 */
export declare const repositories: {
    extensions: import("./plugins").ExtensionRepositoryDefinition[];
    files: import("../container").RepositoryDefinition[];
    stores: (import("../container").RepositoryDefinition | {
        name: string;
        register: {
            babel: string;
            css: string;
            file: string;
            miniCss: string;
            postCss: string;
            resolveUrl: string;
            style: string;
            svgr: string;
            url: string;
        };
    })[];
};
//# sourceMappingURL=index.d.ts.map