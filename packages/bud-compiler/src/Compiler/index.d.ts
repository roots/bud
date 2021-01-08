/// <reference types="webpack" />
import Service from './Service';
import type { Compiler, Webpack } from '@roots/bud-typings';
/**
 * Compiler
 */
export default class extends Service implements Compiler {
    statsOptions: Compiler.Stats.Options;
    instance: Webpack.Compiler;
    stats: Compiler.Stats.Output;
    errors: string[];
    progress: Compiler.Progress;
    register(): void;
    get(): Webpack.Compiler;
    set(compiler: Webpack.Compiler): void;
    compile(): Webpack.Compiler;
    run(): void;
    makeError(err: string): void;
    applyPlugins(handler: Compiler.ProgressHandler): void;
}
//# sourceMappingURL=index.d.ts.map