import {Service} from '@roots/bud-framework'
import type {Compiler, Webpack} from '@roots/bud-typings'

/**
 * ## bud.compiler
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/compiler](https://git.io/JkCQG)
 * [📦 @roots/bud-compiler](https://www.npmjs.com/package/@roots/bud-compiler)
 * [🔗 Documentation](#)
 */
export default abstract class extends Service {
  public instance: Webpack.Compiler

  public stats: Compiler.Stats.Output

  public statsOptions: Compiler.Stats.Options

  public errors: string[]

  public progress: Compiler.Progress
}
