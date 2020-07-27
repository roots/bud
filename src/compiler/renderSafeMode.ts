import webpack from "webpack";
import chalk from "chalk";
import type { Bud, WebpackStats, WebpackConfig } from "./types";

/**
 * Display stats.
 *
 * Normal-ish webpack stdout.
 *
 * @param  {object} stats - webpack stats object
 * @return {void}
 */
const displayStats = (stats: WebpackStats) => {
  console.log(chalk.bgWhite.black("\n Build results \n"));

  const statsOptions: Object = {
    all: false,
    assets: true,
    errors: true,
    warnings: true,
    colors: {
      green: "\u001b[38;5;63m",
    },
  };

  console.log(stats.toString(statsOptions));

  console.log("\n");
};

/**
 * Safe mode
 */
const compileSafeMode = (config: any, webpackConfig: WebpackConfig) => {
  const webpackCallback = (err: any, stats: WebpackStats) => {
    if (err) {
      console.error(err.stack || err);

      if (err.details) {
        console.error(err.details);
      }

      return;
    }

    displayStats(stats);

    if (config.inProduction) {
      process.exit(0);
    }
  };

  if (!config.inProduction) {
    webpack(webpackConfig).watch({}, webpackCallback);
  } else {
    webpack(webpackConfig).run(webpackCallback);
  }
};

export { compileSafeMode };
