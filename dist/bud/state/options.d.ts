import type { BabelConfiguration, Copy, PostCssConfiguration, Vendor, WordPressDependenciesOptions } from './types';
declare const babel: (configs: any) => BabelConfiguration;
declare const browserSync: (flags: any) => object;
declare const postCss: (configs: any) => PostCssConfiguration;
declare const typescript: (configs: any) => any;
/**
 * Options container.
 */
declare const optionsRepository: {
    copy: Copy;
    dev: any;
    dependencyManifest: WordPressDependenciesOptions;
    devtool: string;
    extensions: string[];
    filenameTemplate: {
        hashed: string;
        default: string;
    };
    inlineManifest: {
        name: string;
    };
    splitting: {
        maxChunks: any;
    };
    target: "web";
    uglify: {
        cache: boolean;
        chunkFilter: ({ name }: {
            name: any;
        }) => boolean;
        extractComments: boolean;
        parallel: boolean;
        uglifyOptions: {
            output: {
                beautify: boolean;
            };
            compress: boolean;
            mangle: {
                toplevel: boolean;
            };
        };
    };
    vendor: Vendor;
    watch: string[];
};
export { optionsRepository, babel, browserSync, postCss, typescript };
//# sourceMappingURL=options.d.ts.map