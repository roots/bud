export const cache = app => ({
  loader: require.resolve('cache-loader'),
  options: {
    cacheDirectory: app.disk.path.resolve(
      app.store.get('locations.project'),
      app.store.get('locations.storage'),
    ),
  },
})
