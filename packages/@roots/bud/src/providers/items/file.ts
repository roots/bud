export const file = app => ({
  loader: require.resolve('file-loader'),
  options: {
    name: app.store.enabled('options.hash')
      ? '[ext]/[name].[hash].[ext]'
      : '[ext]/[name].[ext]',
  },
})
