// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * The `@roots/bud-framework` package defines the abstract {@link Framework} class
 * and provides interfaces for the Framework's essential {@link Service} classes.
 *
 * {@link Framework} is to be extended by a class providing implementations
 * for the service interfaces exported herein.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Item, Loader} from './Build'
import type {Configuration} from './Configuration'
import * as Extension from './Extension'
import {Framework} from './Framework'
import * as Hooks from './Hooks'
import type {Rule} from './Rule'
import {Service} from './Service'

/**
 * Utility type
 *
 * @beta
 */
export type Index<T = any> = {[key: string]: T}

/**
 * Compilation mode
 *
 * @remarks
 * Unlike {@link Webpack.Mode} there is no mode that is
 * not `production` or `development`
 *
 * @beta
 */
export type Mode = 'production' | 'development'

export type Location = string

/**
 * Registered {@link Extension} instances
 *
 * @beta
 */
export namespace Registered {
  /**
   * Registered filesystem directories
   *
   * @remarks
   * The `project` directory is the root directory of the project.
   * All other directories are relative to the `project` directory.
   *
   * @beta
   */
  export interface Locations extends Index<string> {
    /**
     * Project root directory
     *
     * @remarks
     * This is the directory where the project `package.json`
     * file is located.
     *
     * @defaultValue `process.cwd()`
     */
    project: string

    /**
     * Project src directory
     *
     * @remarks
     * Relative to {@link Locations.project}
     *
     * @defaultValue `src`
     */
    src: string

    /**
     * Project dist directory
     *
     * @remarks
     * Relative to {@link Locations.project}
     *
     * @defaultValue `dist`
     */
    dist: string

    /**
     * The public path used in the browser
     *
     * @remarks
     * This is the path that will be used in the browser to access the assets.
     *
     * - An empty string will use the Webpack default public path which is recommended
     * in the [Webpack docs](https://webpack.js.org/configuration/output/#outputpublicpath)
     *
     * @defaultValue ``
     */
    publicPath: string

    /**
     * Directory used for storing build artifacts, logs, etc.
     *
     * @remarks
     * Relative to {@link Locations.project}
     *
     * @defaultValue `./bud`
     */
    storage: string

    /**
     * `node_modules` directory
     *
     * @remarks
     * Relative to {@link Locations.project}
     *
     * @defaultValue `node_modules`
     *
     * @deprecated This is brittle and incompatible with package managers like pnp and yarn@>=2. It will be removed in a future version.
     */
    modules: string
  }

  /**
   * Registered loaders
   *
   * @beta
   */
  export interface Loaders extends Index<Loader> {}

  /**
   * Registered items
   *
   * @beta
   */
  export interface Items extends Index<Item> {}

  /**
   * Registered rules
   *
   * @beta
   */
  export interface Rules extends Index<Rule> {}

  /**
   * Registered {@link Service} classes
   *
   * @beta
   */
  export interface Services
    extends Index<new (app: Framework) => Service> {}

  /**
   * Registered {@link BudExtension} and {@link BudWebpackPlugin} objects
   *
   * @beta
   */
  export interface Extensions
    extends Index<
      Partial<Extension.Module> | Partial<Extension.Plugin>
    > {}
}

/**
 * Framework constructor
 *
 * @param options - Framework constructor params
 *
 * @beta
 */
export type Constructor = new (options: Options) => Framework

/**
 * Constructor options
 *
 * @beta
 */
export interface Options {
  /**
   * {@link Framework.name}
   */
  name: string
  /**
   * {@link Mode}
   */
  mode?: Mode
  /**
   * {@link Configuration}
   */
  config?: Configuration
  /**
   * {@link Services}
   */
  services?: Registered.Services
  /**
   * {@link Framework}
   */
  parent?: Framework
}

/**
 * Callback receiving the {@link Framework} instance as a parameter
 * to aid functional programming
 *
 * @remarks
 * - Accepts the {@link Framework} instance as a parameter
 * - Is bound to the {@link Framework} lexical scope
 *
 * @beta
 */
export interface Tapable<T = Framework> {
  (value?: T): any
}

/**
 * @deprecated Use {@link Extension.Module} instead
 */
export type Module<I = any, O = any> = Extension.Module<I>

/**
 * @deprecated Use {@link Extension.Plugin} instead
 */
export type WebpackPlugin<I = any, O = any> = Extension.Plugin<
  I,
  O
>

export {Framework} from './Framework'
export {Bootstrapper} from './Bootstrapper'
export {Extension}

export {Peers, Project} from './Project'
export {Service} from './Service'
export {Store} from './Store'
export {access} from './Framework/access'
export {bootstrap} from './Framework/bootstrap'
export {close} from './Framework/close'
export {container} from './Framework/container'
export {get} from './Framework/get'
export {make} from './Framework/make'
export {path} from './Framework/path'
export {pipe} from './Framework/pipe'
export {setPath} from './Framework/setPath'
export {sequence} from './Framework/sequence'
export {tap} from './Framework/tap'
export {when} from './Framework/when'

export type {Api} from './Api'
export type {Build} from './Build'
export type {Cache} from './Cache'
export type {Compiler} from './Compiler'
export type {Configuration} from './Configuration'
export type {Dashboard} from './Dashboard'
export type {Dependencies} from './Dependencies'
export type {Env} from './Env'
export type {Extensions} from './Extensions'
export type {Hooks}
export type {Logger} from './Logger'

export type {Server} from './Server'
