import {join} from 'path'
import {makeWebpackConfig} from './builder/webpack'
import {compile} from './compile'
import {compileSafeMode} from './compileSafeMode'
import {format} from 'prettier'
import {highlight} from 'cli-highlight'

/**
 * Load project config.
 */
const config = require(join(process.cwd(), 'bud.config.js'))

/**
 * Set env.
 */
process.env.BABEL_ENV = config.options.mode
process.env.NODE_ENV = config.options.mode

/**
 * Project config => webpack config
 */
const webpackConfig = makeWebpackConfig(config)

/**
 * Dump generated config (bud.dump)
 */
const dump = () => {
  const circularReplacer = () => {
    const seen = new WeakSet()

    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value) || key == 'UI') {
          return;
        }

        seen.add(value);
      }

      return value;
    }
  }

  const normalizedConfigString  = JSON.stringify(webpackConfig, circularReplacer())
  const prettifiedConfigString  = format(normalizedConfigString, {parser: 'json'})
  const highlightedConfigString = highlight(prettifiedConfigString)

  console.log(highlightedConfigString)
  process.exit()
}

config.features.dump && dump()

/**
 * Run compiler.
 *
 * @description If config.features.dashboard is disabled then utilize "safe mode".
 */
config.features.dashboard
  ? compile(config, webpackConfig) // standard bud compiler
  : compileSafeMode(config, webpackConfig) // standard webpack stats output

/**
 * Kill the application on unhandled rejections.
 */
process.on('unhandledRejection', () => {
  process.exit()
})
