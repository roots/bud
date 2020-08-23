import type {Bud} from './'
import type {Extension, ExtensionInterface} from './index'
import type {Plugin as WebpackPlugin} from 'webpack'
import {Fab} from './util/fab'

type ExtensionPropFallback = Bud | Fab['undefined'] | Fab['true']
type MakeExtension = () => WebpackPlugin
type ExtensionTransform = (
  propName?: string,
  fallback?: ExtensionPropFallback,
) => void

export type ExtensionController = {
  bud: Bud
  extension: ExtensionInterface
  build: MakeExtension
  makeExtension: MakeExtension
  bindExtensionProps: ExtensionTransform
  ensureExtensionProp: ExtensionTransform
  setExtensionOptions: ExtensionTransform
  mergeExtensionOptions: ExtensionTransform
}

export type ExtensionControllerFactory = (
  bud: Bud,
  extension: Extension,
) => ExtensionController

/**
 * Extension controller.
 *
 * @this {Bud}
 */
const extensionFactory: ExtensionControllerFactory = (
  bud: Bud,
  extension: Extension,
): ExtensionController => ({
  bud,

  extension: extension(bud),

  /**
   * Build plugin.
   */
  build: function () {
    this.bindExtensionProps()
    this.setExtensionOptions()
    this.mergeExtensionOptions()

    return this.makeExtension()
  },

  /**
   * Bind plugin props
   */
  bindExtensionProps: function (): void {
    this.ensureExtensionProp('bud', this.bud)
    this.ensureExtensionProp('options', this.bud.util.fab.undefined())
    this.ensureExtensionProp('when', this.bud.util.fab.true)
    this.ensureExtensionProp(
      'setOptions',
      this.bud.util.fab.undefined,
    )
    this.ensureExtensionProp(
      'mergeOptions',
      this.bud.util.fab.undefined,
    )
  },

  /**
   * Ensure plugin prop is set.
   */
  ensureExtensionProp: function (prop, fallback) {
    this.extension[prop] = this.extension[prop] || fallback
  },

  /**
   * Set plugin options.
   */
  setExtensionOptions: function () {
    this.boundValue = this.extension.setOptions()

    if (this.boundValue) {
      this.extension.options = this.boundValue
    }

    delete this.boundValue
  },

  /**
   * Merge plugin options.
   */
  mergeExtensionOptions: function () {
    this.boundValue = this.extension.mergeOptions()

    if (this.boundValue) {
      this.extension.options = {
        ...this.extension.options,
        ...this.boundValue,
      }
    }

    delete this.boundValue
  },

  /**
   * Make plugin.
   */
  makeExtension: function () {
    this.extension =
      this.extension.when() && this.extension.make
        ? this.extension.make(this.bud)
        : this.bud.util.fab.undefined()

    if (this.extension) {
      return this.extension
    }
  },
})

export {extensionFactory}
