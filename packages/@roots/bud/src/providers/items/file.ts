export const file = app => ({
  loader: require.resolve('file-loader'),
  options: {
    name: app.store.enabled('options.hash')
      ? '[name].[hash].[ext]'
      : '[name].[ext]',
  },
})
