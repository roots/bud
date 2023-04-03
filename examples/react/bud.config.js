export default async app => {
  app
    .entry(`app`, [`app.js`, `app.css`])
    .runtime(`single`)
    .when(app.isProduction, () => app.splitChunks().minimize())
}
