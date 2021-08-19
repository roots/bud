require('@roots/bud')
  .factory({mode: 'production'})
  .entry('app', 'index.js')
  .run()
