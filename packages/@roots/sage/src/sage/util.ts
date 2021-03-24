import {Sage} from './interface'
import {Container} from '@roots/container'

/**
 * Returns a util fn to check if a dep is used in the project package.json
 * and a container holding the project filesystem.
 */
export const curryConditionalChecks: (
  sage: Sage,
) => [Sage.Deps, Container] = (sage: Sage) => {
  const {info} = sage.discovery
  const files = sage.disk.get<Container>('project')

  /**
   * Dependency check utility
   */
  const checkDeps: Sage.Deps = function (deps) {
    /**
     * Get keys from a theme package.json
     */
    const pkgObjKeys = (key: string): string[] =>
      info.hasOwnProperty(key) ? Object.keys(info[key]) : []

    /**
     * Merge dependencies from package.json keys
     */
    const mergedDependencies: string[] = [
      ...pkgObjKeys('dependencies'),
      ...pkgObjKeys('devDependencies'),
    ]

    /**
     * Fitler dependencies passed as an argument
     * and contained within the merged deps array.
     *
     * Return true if there are any results.
     */
    return (
      deps.filter((dep: string): boolean =>
        mergedDependencies.includes(dep),
      ).length > 0
    )
  }

  return [checkDeps, files]
}
