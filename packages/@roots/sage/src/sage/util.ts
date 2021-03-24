import {Sage} from './interface'
import {Container} from '@roots/container'

export const curryConditionalChecks: (
  sage: Sage,
) => [Sage.Deps, Container] = (sage: Sage) => {
  /**
   * package.json info
   */
  const {projectInfo} = sage.discovery

  /**
   * Project files container
   */
  const projectFiles = sage.disk.get<Container>('project')

  /**
   * Dependency check utility
   */
  const checkDeps = function (deps) {
    /**
     * Get keys from a theme package.json
     */
    const pkgObjKeys = (key: string): string[] =>
      projectInfo[key]
        ? Object.keys(projectInfo[key])
        : projectInfo[key]

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

  return [checkDeps, projectFiles]
}
