module.exports = async app => {
  app
    .entry('app', ['app.vue'])
    .minimize()
    .tap(app =>
      app.dump(app.build.make().module.rules, {}, Infinity),
    )
}
