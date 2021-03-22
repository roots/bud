import {Sage} from './interface'

export function dependencyConditional(
  this: Sage,
  dependencies: string[],
): boolean {
  const project = this.discovery.projectInfo

  const hasDependencies =
    project.dependencies && Array.isArray(project.dependencies)

  const hasDevDependencies =
    project.devDependencies &&
    Array.isArray(project.devDependencies)

  return (
    dependencies.filter(
      (dep: string): boolean =>
        /**
         * Project has dependencies and depends on one of the deps
         */
        (hasDependencies &&
          this.discovery.projectInfo.dependencies?.includes(
            dep,
          )) ||
        /**
         * Project has devDependencies and depends on one of the deps
         */
        (hasDevDependencies &&
          this.discovery.projectInfo.devDependencies?.includes(
            dep,
          )),
    ).length > 0
  )
}
