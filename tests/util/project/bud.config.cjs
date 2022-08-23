// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 * @param {Bud} app
 */
module.exports = async (app) => {
  app
    .entry({
      app: [`scripts/app`, `styles/app`],
    })
    .copy([`images`])
    .template({ template: `src/index.html`, cache: true })
    .devtool(false)
    .watch([`index.html`, `images`])
    .serve(3015);
};
