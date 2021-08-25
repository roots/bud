/**
 * @module @roots/merged-manifest-webpack-plugin
 */
import * as Webpack from 'webpack';
/**
 * @class MergedManifestWebpackPlugin
 */
declare class MergedManifestWebpackPlugin {
    plugin: {
        name: string;
    };
    dir: string;
    path: string;
    file: string;
    entrypointsName: string;
    wordpressName: string;
    constructor(options?: {
        entrypointsName?: string;
        wordpressName?: string;
        file?: string;
    });
    apply(compiler: Webpack.Compiler): void;
    done(_compilation: any, callback: any): Promise<CallableFunction>;
    format(object: {
        [key: string]: {
            [key: string]: string[];
        };
    }): string;
    isBuildable(): boolean;
    manifestPath(file: string): string;
    manifestExists(file: string): boolean;
    manifestContent(file: string): Promise<any>;
}
/**
 * @exports MergedManifestWebpackPlugin
 * @exports default
 */
export { MergedManifestWebpackPlugin, MergedManifestWebpackPlugin as default, };
//# sourceMappingURL=index.d.ts.map