import {Sage} from './interface'
import {Container} from '@roots/container'

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
      info.hasOwnProperty(key)
        ? Object.keys(info[key])
        : info[key]

    /**
     * Merged dependencies from project
     */
    const mergedDependencies: string[] = [
      ...pkgObjKeys('dependencies'),
      ...pkgObjKeys('devDependencies'),
    ]

    /**
     * Fitler the dependency argument from
     * its presence in the mergedDependencies
     * array. Return the result.
     */
    return (
      deps.filter((dep: string): boolean =>
        mergedDependencies.includes(dep),
      ).length > 0
    )
  }

  return [checkDeps, files]
}
