// @ts-check
const {bud: app} = require('../../packages/@roots/bud')

app
  .use([
    require('@roots/bud-babel'),
    require('@roots/bud-postcss'),
    require('@roots/bud-react'),
    require('@roots/bud-emotion'),
  ])
  .html({enabled: true})
  .entry({app: 'app.{js,css}'})
  .run()
