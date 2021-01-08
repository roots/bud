import Webpack, { ExternalsPlugin } from 'webpack';
export declare class Plugin {
    plugin: {
        name: string;
        stage: number;
    };
    output: {
        dir: string;
        name: string;
        file: string;
        publicPath: any;
        content: {};
    };
    options: Options;
    externals: ExternalsPlugin;
    /**
     * Class constructor
     */
    constructor(options?: Options);
    apply(compiler: Webpack.Compiler): void;
    emit(compilation: Webpack.compilation.Compilation, callback: () => void): Promise<void>;
}
export declare type EntrySchema = {
    [key: string]: string | string[];
};
export declare type Content = EntrySchema | EntrySchema[] | null;
/**
 * Plugin options
 */
export declare type Options = {
    /**
     * Name of outputted file.
     */
    name: string;
    /**
     * Should manifest be written to disk.
     */
    writeToFileEmit: boolean;
    /**
     * Transform requests for 'react' and 'react-dom'
     * to '@wordpress/element'
     */
    useElementAsReact: boolean;
};
//# sourceMappingURL=index.d.ts.map