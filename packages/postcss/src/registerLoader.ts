export default (bud: Framework.Bud): void => {
  bud.components['loaders'].set(
    'postcss-loader',
    require.resolve('postcss-loader'),
  )
}
