import type {InlineManifest, Bud} from './types'

const inlineManifest: InlineManifest = function (name: string): Bud {
  this.logger.info({name: 'bud.api', function: 'bud.inlineManifest', options: {name}}, `bud.inlineManifest called`)

  this.features.enable('inlineManifest')

  const value = this.hooks.filter('api.inlineManifest.filter', {name: name || 'runtime'})
  this.options.set('inlineManifest', value)

  return this
}

export {inlineManifest}
