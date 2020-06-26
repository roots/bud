module.exports = ({makepot}) => ({
  plugins: [
    require('@babel/plugin-syntax-dynamic-import'),
    require('@babel/plugin-proposal-object-rest-spread'),
    require('babel-plugin-macros'),
    require('babel-plugin-emotion'),
    ...(makepot
      ? [
          require('@wordpress/babel-plugin-makepot'),
          {output: makepot},
        ]
      : []),
  ],
  presets: [
    require('@babel/preset-react'),
    require('@babel/preset-env'),
  ],
})
