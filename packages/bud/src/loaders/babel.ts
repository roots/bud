const babel = {
  loader: require.resolve('babel-loader'),
  options: {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: false,
          forceAllTransforms: true,
        },
      ],
    ],

    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve(
        '@babel/plugin-proposal-object-rest-spread',
      ),
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: false,
        },
      ],
    ],
  },
}

export = babel
