export const resolveUrl = {
  loader: require.resolve('resolve-url-loader'),
  options: {
    root: process.cwd(),
    sourceMap: true,
  },
}
