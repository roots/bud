import type {Bud, DependencyManifest, DependencyExtractionOptions} from './types'

const dependencyManifest: DependencyManifest = function (
  this: Bud,
  settings?: DependencyExtractionOptions,
): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.dependencyManifest', settings},
    `bud.dependencyManifest called`,
  )

  this.features.enable('dependencyManifest')

  settings &&
    this.options.set('dependencyManifest', {
      ...this.options.get('dependencyManifest'),
      ...settings,
    })

  return this
}

export {dependencyManifest}
