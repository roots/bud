module.exports = {
  presets: [
    require('@babel/preset-typescript'),
    require('@babel/preset-react'),
  ],
  plugins: [
    require('@babel/plugin-proposal-nullish-coalescing-operator'),
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-proposal-object-rest-spread'),
  ],
}
