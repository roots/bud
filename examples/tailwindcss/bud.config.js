// @ts-check
const {
  app,
} = require('./../../packages/@roots/bud-preset-recommend')

app
  .use(require('@roots/bud-tailwindcss'))
  .html({
    template: app.project('public/index.html'),
  })
  .entry('bud-tailwind', ['app.css'])
  .run()
