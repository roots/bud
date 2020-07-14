import webpack from 'webpack'
import chalk from 'chalk'

/**
 * Display stats.
 *
 * Normal-ish webpack stdout.
 *
 * @param  {object} stats - webpack stats object
 * @return {void}
 */
const displayStats = stats => {
  console.log(chalk.bgWhite.black('\n Build results \n'))

  console.log(
    stats.toString({
      all: false,
      assets: true,
      errors: true,
      warnings: true,
      colors: {
        green: '\u001b[38;5;63m',
      },
    }),
  )

  console.log('\n')
}

/**
 * Safe mode
 */
const compileSafeMode = (config, webpackConfig) => {
  const webpackCallback = (err, stats) => {
    if (err) {
      console.error(err.stack || err)

      if (err.details) {
        console.error(err.details)
      }

      return
    }

    displayStats(stats)

    if (config.inProduction) {
      process.exit(0)
    }
  }

  if (!config.isProduction) {
    webpack(webpackConfig).watch({}, webpackCallback)
  } else {
    webpack(webpackConfig).run(webpackCallback)
  }
}

export {compileSafeMode}
