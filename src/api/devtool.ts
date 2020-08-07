import type {Bud, Devtool, WebpackOptions} from './types'

const devtool: Devtool = function (devtool: WebpackOptions.Devtool): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.devtool', devtool},
    `bud.devtool called`,
  )

  this.options.set('devtool', devtool)

  return this
}

export {devtool}
