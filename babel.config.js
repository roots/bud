const {join} = require('path')

module.exports = {
  presets: [
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  ignore: [
    join(__dirname, 'node_modules'),
  ],
}
