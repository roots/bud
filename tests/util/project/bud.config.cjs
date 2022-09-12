module.exports = async app => {
  app
    .entry({
      app: [`scripts/app`, `styles/app`],
      app2: [`styles/app`],
    })
    .copy([[`images`, `images`]])
    .template({
      cache: true,
      replace: {APP_TITLE: `Bud`},
    })
    .devtool(false)
    .watch([`index.html`, `images`])
    .serve(3015)
}
