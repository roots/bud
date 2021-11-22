module.exports = async app => {
  app.entry('app', ['app.vue']).minimize()
}
