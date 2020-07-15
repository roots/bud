const loader = {
  file: require.resolve('file-loader'),
  url: require.resolve('url-loader'),
  svgr: require.resolve('@svgr/webpack'),
}

const pattern = {
  font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
  image: /\.jpe?g$|\.gif$|\.png$/i,
  svg: /\.svg$/,
  module: /node_modules/,
}

const moduleFont = ({
  test: pattern.font,
  include: pattern.module,
  loader: loader.url,
  options: {
    limit: 4096,
    outputPath: 'vendor/',
    name: '[path][name].[ext]',
  },
})

const font = ({
  test: pattern.font,
  loader: loader.url,
  options: {
    limit: 4096,
    name: '[path][name].[ext]',
  },
})

const image = ({
  test: pattern.image,
  use: [
    {
      loader: loader.file,
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],
})

const svg = ({
  test: pattern.svg,
  use: [loader.svgr, loader.url],
})

const resources = [
  moduleFont,
  font,
  image,
  svg,
]

export {resources}
