const loader = {
  file: require.resolve('file-loader'),
  url: require.resolve('url-loader'),
  svgr: require.resolve('@svgr/webpack'),
}

const pattern = {
  font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
  image: /\.jpe?g$|\.gif$|\.png$/i,
  svg: /\.svg$/,
  module: /node_modules/,
}

const font = {
  test: pattern.font,
  use: [
    {
      loader: loader.url,
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],
}

const image = {
  test: pattern.image,
  use: [
    {
      loader: loader.file,
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],
}

const svg = {
  test: pattern.svg,
  use: [loader.svgr, loader.url],
}

/**
 * Resources
 */
const resources = () => ({
  ...font,
  ...image,
  ...svg,
})

export {resources}
