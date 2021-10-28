module.exports = app =>
  app.use('@roots/bud-vue').entry('app', ['app.vue']).minimize()
