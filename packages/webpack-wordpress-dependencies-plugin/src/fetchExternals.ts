import {windowVariables} from './windowVariables'
import {packages} from './packages'
/**
 * Fetch declared dependencies from the wordpress/gutenberg repo
 */
const fetchExternals: WordPressExternals.Package.Fetch = () => {
  try {
    return {
      ...transformPkgNames(packages),
      ...windowVariables,
    }
  } catch (err) {
    throw err
  }
}

/**
 * Filter and transform fetched packages
 */
const transformPkgNames: WordPressExternals.Package.Transform = entries =>
  entries.filter(isWpDependency).reduce(pkgNameReducer, {})

/**
 * Return true if package is in wordpress org scope
 */
const isWpDependency: WordPressExternals.Package.Name.Test = dep =>
  /^@wordpress\//.test(dep)

/**
 * Reduce scoped module names to a hash matching
 * them against their equivalent window var
 */
const pkgNameReducer: WordPressExternals.Package.Reduce = (
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
const enqueueName: WordPressExternals.Package.Name.Transform = name =>
  name.replace(/^@wordpress\/(.*)$/, (m, g) => `${g}`)

/**
 * Transform module names.
 */
const windowName: WordPressExternals.Package.Name.Transform = name =>
  name
    .replace(/^@wordpress\/(.*)$/, (m, g) => `wp.${g}`)
    .replace(/-(.)/g, (m, g) => g.toUpperCase())

export {fetchExternals as default}
