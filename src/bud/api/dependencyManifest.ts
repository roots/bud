import type {Bud, DependencyManifest, DependencyExtractionOptions} from './types'

const dependencyManifest: DependencyManifest = function (
  this: Bud,
  settings?: DependencyExtractionOptions,
): Bud {
  this.features.enable('dependencyManifest')
  settings &&
    this.options.set('dependencyManifest', {
      ...this.options.get('dependencyManifest'),
      ...settings,
    })

  return this
}

export {dependencyManifest}
