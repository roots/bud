import {Extension} from '../Extension'
import type {Container, MaybeCallable} from '@roots/bud-typings'

interface Extensions {
  /**
   * Get an extension instance.
   */
  get(name: string): Extension

  /**
   * Register an extension.
   */
  set(name: string, extension: MaybeCallable): this

  /**
   * Register a plugin to be utilized during compilation.
   */
  use(pkg: string): this

  /**
   * Create a new controller instance wrapping an extension module.
   */
  make(extensions: Container): void

  /**
   * Get all extensions.
   */
  getStore(): Container
}

export default Extensions
