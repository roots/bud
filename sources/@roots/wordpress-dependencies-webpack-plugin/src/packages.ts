import join from 'lodash/join.js'

export type WordPressScopePkg = `@wordpress/${string}`

export type WordPressProvidedPackages =
  | 'jquery'
  | 'lodash'
  | 'react-dom'
  | 'react'
  | WordPressScopePkg

export interface Externals {
  enqueue: string
  window: ['wp', string]
}

export type PackageMapEntry = [string, Record<string, string>]

/**
 * Packages in the `@wordpress` namespace which
 * should not be considered as external
 */
const OMIT_PACKAGE_MATCHES = [`@wordpress/icons`, `@wordpress/interface`]

/**
 * Pkg map
 */
const packageMap = new Map([
  [
    `jquery`,
    {
      enqueue: `jquery`,
      window: join([`jQuery`], `.`),
    },
  ],
  [
    `lodash`,
    {
      enqueue: `lodash`,
      window: join([`lodash`], `.`),
    },
  ],
  [
    `react-dom`,
    {
      enqueue: `react-dom`,
      window: join([`ReactDOM`], `.`),
    },
  ],
  [
    `react`,
    {
      enqueue: `react`,
      window: join([`React`], `.`),
    },
  ],
])

/**
 * Camelize wordpress package name
 */
const camelize = (packageName: string): string =>
  packageName.replace(/-(.)/g, (_m: string, g: string): string =>
    g.toUpperCase(),
  )

/**
 * Transform wordpress package name
 */
const transformPackageName = (packageName: string) =>
  packageName.replace(/^@wordpress\/(.*)$/, (_m, g) => g)

/**
 * Is pkg string a wordpress window var match
 */
export const isProvided: (
  packageName: string,
) => boolean = packageName => {
  if (!packageName || OMIT_PACKAGE_MATCHES.includes(packageName))
    return false

  return (
    packageName.includes(`@wordpress`) ||
    Array.from(packageMap.keys()).includes(packageName)
  )
}

/**
 * Transform pkg string request
 */
export const transform = (packageName: string): any => {
  const transformedPackageName = transformPackageName(packageName)

  if (packageMap.has(packageName)) return packageMap.get(packageName)

  if (isProvided(packageName)) {
    return {
      enqueue: join([`wp`, transformedPackageName], `-`),
      window: [`wp`, camelize(transformedPackageName)],
    }
  }
}
