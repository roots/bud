import type {Config} from '@roots/bud-framework'
import {cpus} from 'node:os'

/**
 * Bud configuration defaults
 *
 * @public
 */
export const seed: Config.Options['seed'] = {
  'feature.cache': [() => true],
  'feature.clean': [() => true],
  'feature.hash': [() => false],
  'feature.html': [() => false],
  'feature.inject': [() => true],
  'feature.log': [() => false],
  'feature.manifest': [() => true],
  'feature.runtimeChunk': [() => false],
  'feature.splitChunks': [() => false],

  'value.fileFormat': [() => `[name]`],
  'value.hashFormat': [() => `[name].[contenthash:6]`],

  'pattern.js': [() => /\.(cjs|mjs|jsx?)$/],
  'pattern.ts': [() => /\.(tsx?)$/],
  'pattern.sass': [() => /\.(scss|sass)$/],
  'pattern.sassModule': [() => /\.module\.(scss|sass)$/],
  'pattern.css': [() => /\.css$/],
  'pattern.cssModule': [() => /\.module\.css$/],
  'pattern.font': [() => /\.(ttf|otf|eot|woff2?|ico)$/],
  'pattern.html': [() => /\.(html?)$/],
  'pattern.image': [() => /\.(png|jpe?g|gif|webp)$/],
  'pattern.modules': [() => /(node_modules|bower_components)/],
  'pattern.svg': [() => /\.svg$/],
  'pattern.vue': [() => /\.vue$/],
  'pattern.md': [() => /\.md$/],
  'pattern.toml': [() => /\.toml$/],
  'pattern.webp': [() => /\.webp$/],
  'pattern.yml': [() => /\.ya?ml$/],
  'pattern.xml': [() => /\.xml$/],
  'pattern.csv': [() => /\.(csv|tsv)$/],
  'pattern.json': [() => /\.json$/],
  'pattern.json5': [() => /\.json5$/],

  'location.@src': [() => `src`],
  'location.@dist': [() => `dist`],
  'location.@modules': [() => `node_modules`],
  'location.@storage': [() => `.budfiles`],

  'build.infrastructureLogging.level': [(): 'none' => `none`],
  'build.module.noParse': [() => undefined],
  'build.module.unsafeCache': [() => false],
  'build.node': [() => false],
  'build.optimization.minimize': [() => false],
  'build.optimization.minimizer': [() => [`...`]],
  'build.optimization.removeEmptyChunks': [() => true],
  'build.parallelism': [() => 10 * Math.max(cpus().length - 1, 1)],
  'build.performance': [() => ({hints: false})],
  'build.resolve.extensions': [
    () =>
      new Set([
        `.mjs`,
        `.cjs`,
        `.js`,
        `.jsx`,
        `.css`,
        `.json`,
        `.wasm`,
        `.yml`,
        `.toml`,
      ]),
  ],
  'build.module.rules.before': [
    () => [
      {
        test: /\.(cjs|mjs|jsx?)$/,
        exclude: [/node_modules/],
        parser: {requireEnsure: false},
      },
    ],
  ],
  'build.module.rules.after': [() => []],
  'build.stats': [() => ({preset: `errors-warnings`})],
  'dev.middleware.enabled': [() => [`dev`, `hot`]],
  'dev.url': [() => new URL(`http://0.0.0.0:3000`)],
}
