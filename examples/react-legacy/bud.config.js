/**
 * @param {import('@roots/bud').Bud} app
 */
export default async app => {
  app
    .entry(`app`, [`app.js`, `app.css`])
}
