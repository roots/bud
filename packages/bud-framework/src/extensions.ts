import type {Plugin as WebpackPlugin} from 'webpack'
import type {Framework} from './index.d'

type ExtensionPropFallback = any
type MakeExtension = () => WebpackPlugin
type ExtensionTransform = (
  propName?: string,
  fallback?: ExtensionPropFallback,
) => void

export type ExtensionController = {
  app: Framework
  extension: any
  build: MakeExtension
  makeExtension: MakeExtension
  bindExtensionProps: ExtensionTransform
  ensureExtensionProp: ExtensionTransform
  setExtensionOptions: ExtensionTransform
  mergeExtensionOptions: ExtensionTransform
}

export type ExtensionControllerFactory = (
  app: Framework,
  extension: any,
) => ExtensionController

/**
 * Extension controller.
 *
 * @this {Bud}
 */
const extensions: ExtensionControllerFactory = (
  app: Framework,
  extension: any,
): ExtensionController => ({
  app,

  extension: extension(app),

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
    this.ensureExtensionProp('options', this.app.util.fab.undefined())
    this.ensureExtensionProp('when', this.app.util.fab.true)
    this.ensureExtensionProp(
      'setOptions',
      this.app.util.fab.undefined,
    )
    this.ensureExtensionProp(
      'mergeOptions',
      this.app.util.fab.undefined,
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
        ? this.extension.make(this.app)
        : this.app.util.fab.undefined()

    if (this.extension) {
      return this.extension
    }
  },
})

export {extensions}
