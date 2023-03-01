import type {LoaderContext} from 'webpack'

import * as css from './css.cjs'
import * as js from './js.cjs'
import * as scss from './scss.cjs'
import * as ts from './ts.cjs'
import * as vue from './vue.cjs'

export const repository = {
  css: {...css, loader: require.resolve(`./css.cjs`)},
  scss: {...scss, loader: require.resolve(`./scss.cjs`)},
  js: {...js, loader: require.resolve(`./js.cjs`)},
  ts: {...ts, loader: require.resolve(`./ts.cjs`)},
  vue: {...vue, loader: require.resolve(`./vue.cjs`)},
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
