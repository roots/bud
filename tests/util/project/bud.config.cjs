module.exports = async app => {
  app
    .entry({app: [`scripts/app`, `styles/app`]})
    .copy([[`images`, `images`]])
    .template({replace: {APP_TITLE: `Bud`}})
    .devtool(false)
    .watch([`index.html`, `images`])
    .serve(3015)

  app.tailwind.generateImports([`colors`, `fontFamily`])
}
