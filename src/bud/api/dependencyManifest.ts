import type {
  Bud,
  DependencyManifest,
  DependencyExtractionOptions,
} from './types'

const dependencyManifest: DependencyManifest = function (
  this: Bud,
  settings?: DependencyExtractionOptions,
): Bud {
  this.features.enable('dependencyManifest')
  settings && this.options.merge('dependencyManifest', settings)

  return this
}

export {dependencyManifest}
