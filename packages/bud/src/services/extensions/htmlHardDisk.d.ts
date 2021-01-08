import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin';
import type { Module } from '@roots/bud-typings';
interface HtmlWebpackHarddiskPluginOptions {
    /**
     * Path where to save compiled assets
     */
    outputPath?: string;
}
export declare const options: Module.Options<HtmlWebpackHarddiskPluginOptions>;
export declare const make: Module.Make<typeof HtmlHardDiskPlugin, HtmlWebpackHarddiskPluginOptions>;
export declare const when: Module.When;
export {};
//# sourceMappingURL=htmlHardDisk.d.ts.map