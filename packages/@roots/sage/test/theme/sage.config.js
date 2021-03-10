// @ts-check
const {sage} = require('@roots/sage');

sage
  .entry({
    app: ['{scripts,styles}/app.{js,css}'],
    editor: ['{scripts,styles}/editor.{js,css}'],
    customizer: ['scripts/customizer.js'],
  })
  .copy({'assets/': 'resources/{images,fonts}/**/*'})
  .when(sage.isProduction, (sage) => sage.devtool(false))
  .run();

const debug = require(sage.fs.path.join(
  sage.store.get('locations.project'),
  sage.store.get('locations.storage'),
  'webpack.debug.js',
));

console.dir(debug(), {
  colors: true,
  depth: 8,
});
