import type { Bud } from './types';
interface CompilerController {
    bud: Bud;
    dashboardEnabled: () => boolean;
    buildConfig: () => CompilerController;
    compile: () => void;
}
declare type CompilerFactory = (bud: Bud) => CompilerController;
declare const compiler: CompilerFactory;
export { compiler };
export type { CompilerController, CompilerFactory };
//# sourceMappingURL=index.d.ts.map