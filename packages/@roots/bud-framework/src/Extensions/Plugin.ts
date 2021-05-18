import {Module} from './Module'

interface Plugin<Plugin = any, Options = any> extends Module {
  options?: Module.Options<Options>
  make: Module.Make<Plugin, Options>
}

export {Plugin}
