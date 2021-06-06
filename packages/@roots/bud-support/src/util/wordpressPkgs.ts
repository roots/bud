import {join} from 'lodash'

export type WordPressScopePkg = `@wordpress/${string}`

export type PkgName =
  | WordPressScopePkg
  | 'lodash'
  | 'react'
  | 'react-dom'
  | 'jquery'

/**
 * Pkg map
 */
const pkgMap = new Map([
  [
    'jquery',
    {
      window: join(['jQuery'], '.'),
      enqueue: 'jquery',
    },
  ],
  [
    'lodash',
    {
      window: join(['lodash'], '.'),
      enqueue: 'lodash',
    },
  ],
  [
    'react',
    {
      window: join(['React'], '.'),
      enqueue: 'react',
    },
  ],
  [
    'react-dom',
    {
      window: join(['ReactDOM'], '.'),
      enqueue: 'react-dom',
    },
  ],
])

/**
 * Camelize @wordpress pkg names
 */
const camelize = (pkg: string): string =>
  pkg.replace(/-(.)/g, (_m: string, g: string): string =>
    g.toUpperCase(),
  )

/**
 * Transform @wordpress pkg names
 */
const transformPkgName = pkg =>
  pkg.replace(/^@wordpress\/(.*)$/, (_m, g) => g)

/**
 * Is pkg string a wordpress window var match
 */
const isProvided: (pkg: string) => boolean = pkg => {
  if (!pkg) return false

  return (
    pkg.includes('@wordpress') ||
    ['jquery', 'react', 'react-dom', 'lodash'].includes(pkg)
  )
}
/**
 * Transform pkg string request
 */
const transform = (pkg: PkgName) => {
  return pkgMap.has(pkg)
    ? pkgMap.get(pkg)
    : {
        window: ['wp', camelize(transformPkgName(pkg))],
        enqueue: join(['wp', transformPkgName(pkg)], '-'),
      }
}
export {isProvided, transform}
