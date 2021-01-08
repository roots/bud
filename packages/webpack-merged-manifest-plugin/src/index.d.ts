import Webpack from 'webpack';
import type { EntrySchema } from '@roots/entrypoints-webpack-plugin';
declare class MergedManifestWebpackPlugin {
    /**
     * Plugin ident.
     */
    plugin: {
        name: string;
    };
    /**
     * Output dir
     */
    dir: string;
    /**
     * Output filepath
     */
    path: string;
    /**
     * Output filename
     */
    file: string;
    /**
     * Entrypoints filename
     */
    entrypointsName: string;
    /**
     * Externals filename
     */
    wordpressName: string;
    /**
     * Class constructor
     */
    constructor(options?: {
        entrypointsName?: string;
        wordpressName?: string;
        file?: string;
    });
    /**
     * Webpack apply plugin
     */
    apply(compiler: Webpack.Compiler): void;
    /**
     * Webpack.Compilation.CompilerHooks['done']['tapAsync']
     */
    done: (_compilation: any, callback: any) => Promise<CallableFunction>;
    /**
     * Format manifest.
     */
    format(object: {
        [key: string]: {
            [key: string]: string[];
        };
    }): string;
    /**
     * Return true if all manifests are present.
     */
    isBuildable(): boolean;
    /**
     * Return full path of manifest.
     */
    manifestPath(file: string): string;
    /**
     * Return true if manifest is present.
     */
    manifestExists(file: string): boolean;
    /**
     * Return manifest contents as an object.
     */
    manifestContent(file: string): Promise<EntrySchema>;
}
export { MergedManifestWebpackPlugin as default };
//# sourceMappingURL=index.d.ts.map