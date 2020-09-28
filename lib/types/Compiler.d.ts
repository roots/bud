import { Configuration, Compiler as Webpack, ProgressPlugin } from 'webpack';
import { CompilerInterface } from './';
export default class Compiler implements CompilerInterface {
    config: Configuration;
    compiler: Webpack;
    watchOptions: Webpack.WatchOptions;
    watching: Webpack.Watching;
    constructor(config?: Configuration);
    getConfig(): Configuration;
    setConfig(config: Configuration): CompilerInterface;
    compile(): CompilerInterface;
    getCompiler(): Webpack;
    setCompiler(compiler: Webpack): CompilerInterface;
    run(handler: Webpack.Handler): void;
    watch(handler: Webpack.Handler): Webpack.Watching;
    applyPlugins(progressHandler: ProgressPlugin.Handler): CompilerInterface;
}
