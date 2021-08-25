export { WordPressExternals } from './interface';
import { Compiler, ExternalsPlugin } from 'webpack';
export declare class Plugin {
    name: string;
    stage: number;
    externals: ExternalsPlugin;
    constructor();
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=index.d.ts.map