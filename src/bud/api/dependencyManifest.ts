import type {Bud, DependencyManifest, DependencyExtractionOptions} from './types'

const dependencyManifest: DependencyManifest = function (
  this: Bud,
  settings?: DependencyExtractionOptions,
): Bud {
  this.features.enable('dependencyManifest')

  if (settings) {
    this.state.options.dependencyManifest = {
      ...this.state.options.dependencyManifest,
      ...(settings ? settings : {}),
    }
  }

  return this
}

export {dependencyManifest}
