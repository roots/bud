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
