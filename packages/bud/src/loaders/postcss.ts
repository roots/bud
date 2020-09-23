const postcss = {
  loader: require.resolve('postcss-loader'),
  options: {
    plugins: [require('autoprefixer')],
  },
}

export = postcss
