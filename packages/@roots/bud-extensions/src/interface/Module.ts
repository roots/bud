import {Container, Framework, Hooks} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Module<Plugin = any, Options = any> {
    /**
     * The module name
     */
    name: Module.Name

    /**
     * Options registered with the extension
     */
    options?: Module.Options<Options>

    /**
     * Required dependencies.
     */
    dependencies?: string[]

    /**
     * Required development dependencies.
     */
    devDependencies?: string[]

    /**
     * General purpose callback. Called first.
     */
    register?: Module.Register

    /**
     * General purpose callback. Called after everything else.
     */
    boot?: Module.Boot

    /**
     * Objects to bind to the framework.
     */
    api?: Module.Api

    /**
     * Returns an instantiated webpack plugin
     */
    make?: Module.Make<Plugin, Options>

    /**
     * Returns a boolean determining if
     * a webpack plugin should be used in
     * compilation.
     */
    when?: Module.When<Options>

    publish?: Module.Publish
  }

  namespace Module {
    type Name = `${keyof Hooks.Extension.Definitions & string}`

    type Api = {[key: string]: any}

    type Boot = (app: Framework) => unknown

    type Register = (app: Framework) => unknown

    type Options<T = any> = T | ((app: Framework) => T)

    type Make<Plugin = any, Opts = any> = (
      options?: Container<Opts>,
      app?: Framework,
    ) => Plugin

    type When<T = any> =
      | ((app: Framework, opt?: Container<T>) => boolean)
      | boolean

    type Publish = (app: Framework) => Hooks.PublishDict
  }
}
