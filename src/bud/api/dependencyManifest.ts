/**
 * ## bud.dependencyManifest
 * Make a manifest of @wordpress dependencies utilized by entrypoints.
 * @see     https://git.io/JJLxM
 * @example bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})
 */
const dependencyManifest: DependencyManifest = function (
  settings,
) {
  this.features.dependencyManifest = true

  this.features.dependencyManifest &&
    settings &&
    Object.assign(this.options.dependencyManifest, {
      ...this.options.dependencyManifest,
      ...(settings ? settings : {}),
    })

  return this
}

export {dependencyManifest}
import type {bud} from '..'
export type DependencyManifest = (object) => bud
