/// <reference types="webpack" />
import { Service } from '@roots/bud-support';
import type { Compiler, Framework, Webpack } from '@roots/bud-typings';
/**
 * ## bud.compiler
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/compiler](https://git.io/JkCQG)
 * [📦 @roots/bud-compiler](https://www.npmjs.com/package/@roots/bud-compiler)
 * [🔗 Documentation](#)
 */
export default abstract class extends Service<Framework> {
    instance: Webpack.Compiler;
    stats: Compiler.Stats.Output;
    statsOptions: Compiler.Stats.Options;
    errors: string[];
    progress: Compiler.Progress;
}
//# sourceMappingURL=Service.d.ts.map