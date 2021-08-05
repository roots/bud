import {Module} from './Module'

interface Plugin<Plugin = any, Options = any> extends Module {
  /**
   * Returns an instantiated webpack plugin
   */
  make?: Module.Make<Plugin, Options>

  /**
   * Webpack plugin apply.
   */
  apply?: CallableFunction

  /**
   * Returns a boolean determining if a webpack plugin should be used in compilation.
   */
  when?: Module.When<Options>
}

export {Plugin}
