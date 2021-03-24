import {Sage} from './interface'

export function dependencyConditional(
  this: Sage,
  dependencies: string[],
): boolean {
  const project = this.discovery.projectInfo

  return (
    dependencies.filter(
      (dep: string): boolean =>
        Object.keys(project.dependencies)?.includes(dep) ||
        Object.keys(project.devDependencies)?.includes(dep),
    ).length > 0
  )
}
