import type {Bud, Splitting} from './types'

const splitting: Splitting = function (
  this: Bud,
  enabled: boolean,
): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.splitting', enabled},
    `bud.splitting called`,
  )

  this.features.set('splitting', enabled ?? true)

  return this
}

export {splitting}
