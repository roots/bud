module.exports = async app => {
  app
    .entry({
      app: [`scripts/app`, `styles/app`],
    })
    .copy([[`images`, `images`]])
    .template({template: `src/index.html`, cache: true})
    .devtool(false)
    .watch([`index.html`, `images`])
    .serve(3015)
}
