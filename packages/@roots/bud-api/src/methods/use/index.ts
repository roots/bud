import {isArray, isEqual, isFunction} from 'lodash'
import {nanoid} from 'nanoid'
import type {Framework, Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## use
     *
     * Register an extension or set of extensions
     *
     * ### Usage
     *
     * Add packaged bud extensions:
     *
     * ```js
     * bud.use([
     *   require('@roots/bud-babel'),
     *   require('@roots/bud-react'),
     * ])
     * ```
     *
     * Add an extension inline (also works with an array of extensions):
     *
     * ```js
     * bud.use({
     *  name: 'my-webpack-plugin',
     *  make: () => new MyWebpackPlugin(),
     * })
     * ```
     *
     * Add a webpack plugin inline (also work with an array of plugins):
     *
     * ```js
     * bud.use(new MyWebpackPlugin())
     * ```
     */
    use: Framework.Api.Use
  }

  namespace Framework.Api {
    type Input = Module | Module[]
    type Use = (source: Input) => Framework
  }
}

/**
 * Helpers
 */
const isWebpackPlugin = (extension: Module): boolean =>
  extension.apply &&
  isFunction(extension.apply) &&
  !isEqual(extension.apply.toString(), '[native code]')

const hasValidConstructorName = ({
  constructor,
}: Module): boolean =>
  constructor?.name &&
  typeof constructor.name == 'string' &&
  constructor.name !== 'default' &&
  constructor.name !== 'Object'

const generateName = (input: Module) =>
  hasValidConstructorName(input)
    ? input.constructor.name
    : nanoid(4)

/**
 * bud.use method
 */
const use: Framework.Api.Use = function (source) {
  const addExtension = (source: Module) => {
    source.name = source.name ?? generateName(source)

    this.extensions.add(
      isWebpackPlugin(source)
        ? {...source, make: () => source}
        : source,
    )
  }

  !isArray(source)
    ? addExtension(source)
    : source.forEach(addExtension)

  return this
}

export {use}
