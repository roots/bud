// @ts-check
const {
  bud,
} = require('./../../packages/@roots/bud-preset-recommend')

bud.minify()

bud
  .html({
    template: bud.project('public/index.html'),
    replace: {
      APP_TITLE: 'Tailwind Demo',
    },
  })
  .use(require('@roots/bud-tailwindcss'))
  .entry('app', ['app.css', 'app.js'])
  .run()
