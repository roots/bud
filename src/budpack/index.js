import {join} from 'path'
import {webpackConfig} from './builder/webpack'
import {compile} from './compile'
import {compileSafeMode} from './compileSafeMode'
import {format} from 'prettier'
import {highlight} from 'cli-highlight'

/**
 * Load project config.
 */
const budExport = require(join(
  process.cwd(),
  'bud.config.js',
))

/**
 * Set env.
 */
process.env.BABEL_ENV = budExport.options.mode
process.env.NODE_ENV = budExport.options.mode

/**
 * Project config => webpack config
 */
const compiledConfig = webpackConfig(budExport).compile()

/**
 * Dump generated config (bud.dump)
 */
const dump = () => {
  const circularReplacer = () => {
    const seen = new WeakSet()

    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value) || key == 'UI') {
          return
        }

        seen.add(value)
      }

      return value
    }
  }

  const normalizedConfigString = JSON.stringify(
    compiledConfig,
    circularReplacer(),
  )
  const prettifiedConfigString = format(
    normalizedConfigString,
    {parser: 'json'},
  )
  const highlightedConfigString = highlight(
    prettifiedConfigString,
  )

  console.log(highlightedConfigString)
  process.exit()
}
budExport.features.dump && dump()

/**
 * Run compiler.
 *
 * @description If config.features.dashboard is disabled then utilize "safe mode".
 */
budExport.features.dashboard
  ? compile(budExport, compiledConfig) // standard bud compiler
  : compileSafeMode(budExport, compiledConfig) // standard webpack stats output

/**
 * Kill the application on unhandled rejections.
 */
process.on('unhandledRejection', () => {
  process.exit()
})
