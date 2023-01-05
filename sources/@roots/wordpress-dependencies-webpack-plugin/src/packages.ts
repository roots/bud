import join from 'lodash/join.js'

export type WordPressScopePkg = `@wordpress/${string}`

export type WordPressProvidedPackages =
  | WordPressScopePkg
  | 'lodash'
  | 'react'
  | 'react-dom'
  | 'jquery'

export interface Externals {
  window: ['wp', string]
  enqueue: string
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
      window: join([`jQuery`], `.`),
      enqueue: `jquery`,
    },
  ],
  [
    `lodash`,
    {
      window: join([`lodash`], `.`),
      enqueue: `lodash`,
    },
  ],
  [
    `react`,
    {
      window: join([`React`], `.`),
      enqueue: `react`,
    },
  ],
  [
    `react-dom`,
    {
      window: join([`ReactDOM`], `.`),
      enqueue: `react-dom`,
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
      window: [`wp`, camelize(transformedPackageName)],
      enqueue: join([`wp`, transformedPackageName], `-`),
    }
  }
}
