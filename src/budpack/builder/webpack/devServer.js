/**
 * Dev server
 */
const devServer = bud => ({
  devServer: {
    ...bud.options.dev,
  },
})

export {devServer}
