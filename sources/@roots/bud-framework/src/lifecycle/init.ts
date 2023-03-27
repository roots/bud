import isString from '@roots/bud-support/lodash/isString'
import * as paths from '@roots/bud-support/utilities/paths'

import type {Bud} from '../bud.js'

/**
 * Initializes hooks
 *
 * @param bud - the Bud instance
 * @returns Promise
 */
export const initialize = (bud: Bud): Bud =>
  bud.hooks
    .fromMap({
      'feature.hash': () => false,
    })
    .hooks.fromMap({
      'pattern.js': /\.(mjs|jsx?)$/,
      'pattern.ts': /\.(tsx?)$/,
      'pattern.sass': /(?!.*\.module)\.(scss|sass)$/,
      'pattern.sassModule': /\.module\.(scss|sass)$/,
      'pattern.css': /(?!.*\.module)\.css$/,
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
    })
    .hooks.fromMap({
      'location.@src':
        bud.isCLI() && isString(bud.context.args.input)
          ? bud.context.args.input
          : `src`,
      'location.@dist':
        bud.isCLI() && isString(bud.context.args.output)
          ? bud.context.args.output
          : `dist`,
      'location.@os-cache': paths.get(bud.context.basedir).cache,
      'location.@os-config': paths.get(bud.context.basedir).config,
      'location.@os-data': paths.get(bud.context.basedir).data,
      'location.@os-log': paths.get(bud.context.basedir).log,
      'location.@os-temp': paths.get(bud.context.basedir).temp,
      'location.@storage': paths.get(bud.context.basedir).cache,
      'location.@modules':
        bud.isCLI() && isString(bud.context.args.modules)
          ? bud.context.args.modules
          : `node_modules`,
    })
    .when(bud.isDevelopment, ({hooks}) =>
      hooks.fromMap({
        'dev.middleware.enabled': [`dev`, `hot`],
      }),
    )
