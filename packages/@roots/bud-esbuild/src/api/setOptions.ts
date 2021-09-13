import {Framework} from '@roots/bud-framework'

type setOptions = (
  type: 'js' | 'ts',
  opts: LoaderOptions,
) => Framework

interface LoaderOptions {
  target?:
    | 'es2015'
    | 'es2020'
    | 'chrome58'
    | 'firefox57'
    | 'safari11'
    | 'edge16'
    | 'node12.19.0'
  loader?:
    | 'tsx'
    | 'ts'
    | 'js'
    | 'json'
    | 'text'
    | 'base64'
    | 'file'
    | 'dataurl'
    | 'binary'
  jsxFactory?: string
  jsxFragment?: string
}

/**
 * Configure esbuild-loader options
 *
 * @remarks
 * This plugin is in beta and is provided as-is. There may
 * be breaking changes. It is not currently a development
 * priority.
 *
 * @example
 * ```js
 * bud.babel.setOptions({
 *  target: 'es2020',
 * })
 * ```
 *
 * @beta @config
 */
export const setOptions: setOptions = function (
  type,
  opts,
): Framework {
  this.items[`item/esbuild-${type}`].setOptions(app => ({
    ...app.build.items[`item/esbuild-${type}`].options,
    ...opts,
  }))

  return this
}
