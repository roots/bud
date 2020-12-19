import fetch from 'node-fetch'
import {windowVariables} from './windowVariables'

/** Gutenberg repo package.json @ master */
const GUTENBERG_PACKAGE_JSON =
  'https://raw.githubusercontent.com/WordPress/gutenberg/master/package.json'

/**
 * Fetch declared dependencies from the wordpress/gutenberg repo
 */
const fetchExternals: Packages.Fetch = async () => {
  try {
    const data = await fetch(GUTENBERG_PACKAGE_JSON)
    const {dependencies} = await data.json()

    return {
      ...transformPkgNames(dependencies),
      ...windowVariables,
    }
  } catch (err) {
    throw err
  }
}

/**
 * Filter and transform fetched packages
 */
const transformPkgNames: Packages.Transform = entries =>
  Object.keys(entries)
    .filter(isWpDependency)
    .reduce(pkgNameReducer, {})

/**
 * Return true if package is in wordpress org scope
 */
const isWpDependency: PackageName.Test = dep =>
  /^@wordpress\//.test(dep)

/**
 * Reduce scoped module names to a hash matching
 * them against their equivalent window var
 */
const pkgNameReducer: Packages.Reduce = (
  mappedPkgs,
  pkgName,
) => ({
  ...mappedPkgs,
  [pkgName]: {
    window: windowName(pkgName),
    enqueue: enqueueName(pkgName),
  },
})

/**
 * Transform module names.
 */
const enqueueName: PackageName.Transform = name =>
  name.replace(/^@wordpress\/(.*)$/, (m, g) => `wp-${g}`)

/**
 * Transform module names.
 */
const windowName: PackageName.Transform = name =>
  name
    .replace(/^@wordpress\/(.*)$/, (m, g) => `wp.${g}`)
    .replace(/-(.)/g, (m, g) => g.toUpperCase())

export {fetchExternals as default}

export interface Hash {
  [key: string]: any
}

namespace Packages {
  export type Fetch = (
    useElementAsReact?: boolean,
  ) => Promise<Hash>

  export type Transform = (hash: Hash) => Hash

  export type Reduce = (
    accumulated: Hash,
    current: string,
  ) => Hash
}

namespace PackageName {
  export type Transform = (name: string) => string
  export type Test = (name: string) => boolean
}
