export default async app => {
  app
    .setPath(`@src`, `src`)
    .entry({app: [`scripts/app`, `styles/app`]})
    .copy([[`images`, `images`]])
    .template({replace: {APP_TITLE: `Bud`}})
    .devtool(false)
    .watch([`src/*.html`, `src/images`])
    .serve(3015)
}
