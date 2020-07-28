const {bud} = require('./dist')

bud
  .features({
    css: false,
    scss: false,
    image: false,
    manifest: false,
    svg: false,
    terser: false,
    dependencyManifest: false,
    inlineManifest: false,
    vendor: false,
    splitting: false,
    js: true,
    babel: false,
    dashboard: false,
    minify: false,
  })
  .target('node')
  .srcPath('src')
  .distPath('next')
  .bundle('index', [bud.src('index.ts')])

bud.hooks.on('post_config', cfg => console.log(cfg))

module.exports = bud
