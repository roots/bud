import {Sage} from './interface'

/**
 * Sage dependency check
 *
 * Merges project devDependencies and dependencies arrays and then checks
 * if they include a specified set of dependencies. Returns true if
 * dependencies are utilized, false if not.
 */
export function dependencyConditional(
  this: Sage,
  deps: string[],
): boolean {
  const project = this.discovery.projectInfo
  const dependencies = [
    ...(project.dependencies ?? []),
    ...(project.devDependencies ?? []),
  ]

  return (
    deps.filter((dep: string): boolean =>
      dependencies.includes(dep),
    ).length > 0
  )
}
