// @ts-check
const Sage = require('../../packages/sage');

/**
 * Sage - tailwind preset
 */
const theme = Sage.tailwind();

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your projeqct
 * configuration file.
 */
theme.hooks.on('webpack.resolve.modules', function (modules) {
  return [
    ...modules,
    require('path').resolve('./../../node_modules'),
  ];
});

/**
 * Sage theme build
 */
theme
  .entry('app', ['styles/app.scss', 'scripts/app.js'])
  .run();
