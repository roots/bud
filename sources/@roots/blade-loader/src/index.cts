// import loaderUtils from 'loader-utils'
import {join} from 'node:path'

// eslint-disable-next-line n/no-unpublished-import
import type {LoaderContext} from 'webpack'

async function loader (
  this: LoaderContext<any>,
  content: string | Buffer,
  _map?: Record<string, string>,
  _meta?: any
) {
  const stringContents = typeof content !== `string` ? content.toString() : content
  const assetDirectiveRegExp = /@asset\('(.+?)'\)/g;
  const assetMatches = stringContents.matchAll(assetDirectiveRegExp)

  if (!assetMatches) return ``

  return [...assetMatches]
    .reduce((assets, [_match, asset]) => {
      this.addDependency(join(this.context, asset))
      return `${assets}import '${asset}'\n`
    }, ``)
}

export default loader
