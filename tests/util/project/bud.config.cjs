module.exports = async app => {
  app
    .entry({
      app: [`scripts/app`, `styles/app`],
      app2: [`styles/app`],
    })
    .copy([[`images`, `images`]])
    .devtool(false)
    .watch([`index.html`, `images`])
    .serve(3015)
}
