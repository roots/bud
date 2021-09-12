import {Module} from './Module'

export interface WebpackPlugin<
  ApplyConstructor = {apply: any},
  Options = any,
> extends Module {
  /**
   * Returns an instantiated webpack plugin
   */
  make?: Module.Make<ApplyConstructor & {apply: any}, Options>

  /**
   * Webpack plugin apply.
   */
  apply?: CallableFunction

  /**
   * Returns a boolean determining if a webpack plugin should be used in compilation.
   */
  when?: Module.When<Options>
}
