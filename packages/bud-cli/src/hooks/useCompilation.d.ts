import type { Framework, Compiler } from '@roots/bud-typings';
export declare type CompilationAsset = {
    name: string;
    active: boolean;
    size: number;
    hot: boolean;
    info?: string;
};
export interface Compilation {
    progress: {
        percentage: string;
        decimal: number;
        message: string;
    };
    stats: Compiler.Stats.Output['json'];
    errors?: string[];
}
export declare const useCompilation: (bud: Framework) => {
    progress: any;
    stats: any;
    errors: any;
};
//# sourceMappingURL=useCompilation.d.ts.map