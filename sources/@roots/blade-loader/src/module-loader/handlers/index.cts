import type {LoaderContext} from 'webpack'

import * as css from '@roots/blade-loader/module-loader/handlers/css'
import * as js from '@roots/blade-loader/module-loader/handlers/js'
import * as scss from '@roots/blade-loader/module-loader/handlers/scss'
import * as ts from '@roots/blade-loader/module-loader/handlers/ts'
import * as vue from '@roots/blade-loader/module-loader/handlers/vue'

export const repository = {
  css: {...css, loader: require.resolve(`./css/index.cjs`)},
  js: {...js, loader: require.resolve(`./js/index.cjs`)},
  scss: {...scss, loader: require.resolve(`./scss/index.cjs`)},
  ts: {...ts, loader: require.resolve(`./ts/index.cjs`)},
  vue: {...vue, loader: require.resolve(`./vue/index.cjs`)},
}

export const make = function <K extends keyof typeof repository>(
  this: LoaderContext<any>,
  {extension, loader}: (typeof repository)[K],
) {
  const context = this.context || this.rootContext
  const request = `${this.resource}.${extension}!=!${loader}!${this.remainingRequest}`

  return `import ${JSON.stringify(
    this.utils.contextify(context, request),
  )};`
}

export const extract = (source: string, pattern: RegExp): string =>
  [...source.matchAll(pattern)]
    .map(({groups}) => groups?.content)
    .filter(Boolean)
    .join(`\n`)
