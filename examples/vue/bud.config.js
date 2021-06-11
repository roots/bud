module.exports = app =>
  app.use(require('@roots/bud-vue')).entry('app', ['app.vue'])
