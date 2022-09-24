module.exports = async app => {
  app
    .setPath(`@src`, `src`)
    .entry({app: [`scripts/app`, `styles/app`]})
    .copy([[`images`, `images`]])
    .template({replace: {APP_TITLE: `Bud`}})
    .devtool(false)
    .watch([`index.html`, `images`])
    .serve(3015)
}
