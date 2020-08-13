const {bud} = require('@roots/bud')
const {join} = require('path')

bud
  .projectPath(__dirname)
  .srcPath('src')
  .distPath('dist')
  .bundle('app', [bud.src('scripts/app.js'), bud.src('scripts/editor.js')])
  .config()
