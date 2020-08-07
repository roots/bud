import type {Bud, PathSetter} from './Types'

const publicPath: PathSetter = function (dir: string): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.publicPath', dir},
    `bud.publicPath called`,
  )

  this.paths.set('public', dir)

  return this
}

export {publicPath}
