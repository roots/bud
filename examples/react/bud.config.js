export default async app => {
  app.entry({app: [`app.js`, `app.css`]}).when(app.isProduction, () => {
    app.splitChunks().minimize()
  })
}
