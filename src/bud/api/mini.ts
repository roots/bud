import type {Bud, Mini} from './types'

const mini: Mini = function (enable: boolean = true): Bud {
  this.logger.info({name: 'bud.api', function: 'bud.mini', enable}, `bud.mini called`)

  this.features.set('minify', enable)

  return this
}

export {mini}
