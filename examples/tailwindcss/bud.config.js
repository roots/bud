// @ts-check
const {
  app,
} = require('./../../packages/@roots/bud-preset-recommend')

app
  .devtool()
  .html({
    template: app.project('public/index.html'),
    replace: {
      APP_TITLE: 'Tailwind Demo',
    },
  })
  .use(require('@roots/bud-tailwindcss'))
  .entry('bud-tailwind', ['app.css', 'app.js'])
  .run()
