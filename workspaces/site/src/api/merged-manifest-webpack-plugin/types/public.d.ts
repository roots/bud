import * as Webpack from 'webpack';

/**
 * Merged Manifest Webpack Plugin
 *
 * @public
 */
export declare class MergedManifestWebpackPlugin {
    /**
     * Plugin ident
     *
     * @public
     */
    plugin: {
        name: string;
    };
    /**
     * Directory where the manifest will be written.
     *
     * @public
     */
    dir: string;
    /**
     * @public
     */
    path: string;
    /**
     * @public
     */
    file: string;
    /**
     * @public
     */
    entrypointsName: string;
    /**
     * @public
     */
    wordpressName: string;
    /**
     * Plugin constructor
     *
     * @public
     */
    constructor(options?: {
        entrypointsName?: string;
        wordpressName?: string;
        file?: string;
    });
    /**
     * @public
     */
    apply(compiler: Webpack.Compiler): void;
    /**
     * @public
     */
    done(_compilation: any, callback: any): Promise<CallableFunction>;
    /**
     * @public
     */
    format(object: {
        [key: string]: {
            [key: string]: string[];
        };
    }): string;
    /**
     * @public
     */
    isBuildable(): boolean;
    /**
     * @public
     */
    manifestPath(file: string): string;
    /**
     * @public
     */
    manifestExists(file: string): boolean;
    /**
     * @public
     */
    manifestContent(file: string): Promise<any>;
}

export { }
