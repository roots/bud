import Webpack from 'webpack';
import { SyncWaterfallHook } from 'tapable';
export declare class Plugin {
    /**
     * Plugin ident
     */
    plugin: {
        name: string;
        stage: number;
    };
    /**
     * Compilation context.
     */
    context: Webpack.Compilation.Compilation['context'];
    /**
     * Hook: webpack compilation output.
     */
    hook: string[];
    /**
     * Build hash
     */
    hash: Webpack.Compilation.Compilation['hash'];
    /**
     * Emitted filename
     */
    name: string;
    /**
     * Emitted file path
     */
    path: string;
    /**
     * Emitted file
     */
    file: string;
    /**
     * Public path of emitted assets
     */
    publicPath: string;
    /**
     * Emitted contents
     */
    output: EntrySchema;
    /**
     * Should manifest be emitted
     */
    writeToFileEmit: boolean;
    /**
     * Class constructor
     */
    constructor(options?: Options);
    /**
     * Webpack apply plugin
     */
    apply(compiler: Webpack.Compiler): void;
    /**
     * Emit manifest
     */
    emit(compilation: Webpack.Compilation.Compilation, callback: () => void): Promise<void>;
    /**
     * Map entrypoints to output
     */
    entrypoints(entrypoints: SyncWaterfallHook['call']['arguments']): void;
    /**
     * Assign entrypoint to output property
     */
    makeEntry(name: string): void;
    /**
     * Push chunk onto existing manifest entry.
     */
    pushChunk(name: string, type: string, entry: string): void;
}
/**
 * Schema for manifest entry
 */
export declare type EntrySchema = {
    [key: string]: {
        version?: string;
        js?: Array<string>;
        css?: Array<string>;
    };
};
/**
 * Literally the same
 * @todo transition to EntrySchema
 * @deprecated
 */
export declare type Output = EntrySchema;
/**
 * Constructor params
 */
export declare type Options = {
    name: string;
    writeToFileEmit: boolean;
};
//# sourceMappingURL=index.d.ts.map