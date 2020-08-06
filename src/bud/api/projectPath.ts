import type {Bud, PathSetter} from './Types'

const projectPath: PathSetter = function (dir: string): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.projectPath', dir},
    `bud.projectPath called`,
  )

  this.paths.set('project', dir)

  return this
}

export {projectPath}
