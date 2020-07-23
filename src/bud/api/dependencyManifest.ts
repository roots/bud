import type {Bud, DependencyManifest} from '.'

/**
 * ## bud.dependencyManifest
 *
 * @see https://git.io/JJLxM
 *
 * ```js
 * bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})
 * ```
 */
const dependencyManifest: DependencyManifest = function (
  settings,
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
