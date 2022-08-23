import type * as Config from '@roots/bud-framework/config'

/**
 * Bud configuration defaults
 *
 * @public
 */
export const seed: Config.Context['seed'] = {
  'feature.clean': true,
  'feature.hash': false,
  'feature.manifest': true,
  'feature.runtimeChunk': false,
  'feature.splitChunks': false,

  'value.fileFormat': `[name]`,
  'value.hashFormat': `[name].[contenthash:6]`,

  'pattern.js': /\.(cjs|mjs|jsx?)$/,
  'pattern.ts': /\.(tsx?)$/,
  'pattern.sass': /\.(scss|sass)$/,
  'pattern.sassModule': /\.module\.(scss|sass)$/,
  'pattern.css': /\.css$/,
  'pattern.cssModule': /\.module\.css$/,
  'pattern.font': /\.(ttf|otf|eot|woff2?|ico)$/,
  'pattern.html': /\.(html?)$/,
  'pattern.image': /\.(png|jpe?g|gif|webp)$/,
  'pattern.modules': /(node_modules|bower_components)/,
  'pattern.svg': /\.svg$/,
  'pattern.vue': /\.vue$/,
  'pattern.md': /\.md$/,
  'pattern.toml': /\.toml$/,
  'pattern.webp': /\.webp$/,
  'pattern.yml': /\.ya?ml$/,
  'pattern.xml': /\.xml$/,
  'pattern.csv': /\.(csv|tsv)$/,
  'pattern.json': /\.json$/,
  'pattern.json5': /\.json5$/,
  'location.@src': `src`,
  'location.@dist': `dist`,
  'location.@storage': `.budfiles`,
  'location.@modules': `node_modules`,
  'build.stats': {preset: `errors-only`},
  'dev.middleware.enabled': [`dev`, `hot`],
  'dev.url': new URL(`http://0.0.0.0:3000`),
}
