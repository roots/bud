import {Bud} from '@roots/bud-framework'

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

export interface esbuild {
  (type: 'js' | 'ts', opts: LoaderOptions): Bud
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
 * @beta
 */
export const esbuild: esbuild = function (type, opts): Bud {
  this.items[`esbuild-${type}`].setOptions(app => ({
    ...app.build.items[`esbuild-${type}`].options,
    ...opts,
  }))

  return this
}
