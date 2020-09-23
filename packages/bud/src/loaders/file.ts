const file = {
  loader: require.resolve('file-loader'),
  options: {
    name: '[path][name].[ext]',
  },
}

export = file
