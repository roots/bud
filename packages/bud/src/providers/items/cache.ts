export const cache = app => ({
  loader: require.resolve('cache-loader'),
  options: {
    cacheDirectory: app.disk.path.resolve(
      app.options.get('project'),
      app.options.get('storage'),
    ),
  },
})
