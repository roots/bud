const loader = {
  file: require.resolve('file-loader'),
}

const resources = ({svg}) => [
  {
    test: /\.jpe?g$|\.gif$|\.png$/i,
    use: [
      {
        loader: loader.file,
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: svg.use,
  },
]

export {resources}
