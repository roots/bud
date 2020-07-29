import type {Bud, DependencyManifest, DependencyExtractionOptions} from './types'

const dependencyManifest: DependencyManifest = function (
  this: Bud,
  settings?: DependencyExtractionOptions,
): Bud {
  this.state.features.dependencyManifest = true

  this.state.features.dependencyManifest &&
    settings &&
    Object.assign(this.state.options.dependencyManifest, {
      ...this.state.options.dependencyManifest,
      ...(settings ? settings : {}),
    })

  return this
}

export {dependencyManifest}
