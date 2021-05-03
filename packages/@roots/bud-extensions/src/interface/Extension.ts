import {Framework, Hooks} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Extension {
    /**
     * Module
     */
    readonly module: Module

    /**
     * App
     */
    readonly app: Framework

    /**
     * Name
     */
    name: Module['name']

    /**
     * Options
     */
    options: Module['options']

    /**
     * Development Dependencies
     */
    dependencies: Module['dependencies']

    /**
     * Development Dependencies
     */
    devDependencies: Module['devDependencies']

    /**
     * When
     */
    when: Module['when']

    /**
     * Make
     */
    make: Module['make']

    /**
     * Make hook key from module property
     */
    makeKey(key: keyof Hooks.Extension.Definitions): Hooks.Name

    /**
     * Get module properties (hooked)
     */
    get(key: keyof Hooks.Extension.Definitions): any

    /**
     * Set module properties (hooked)
     */
    set(key: keyof Hooks.Extension.Definitions, value: any): void
  }
}
