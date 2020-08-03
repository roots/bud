const useFile = (rule, bud) => {
  const loader = bud.hooks.filter('webpack.rules.fileloader.loader', bud.loaders.get('file'))
  const options = bud.hooks.filter('webpack.rules.fileloader.options', {
    name: '[path][name].[ext]',
  })

  bud.logger.info({name: rule, loader}, `using file-loader`)

  return {
    loader,
    options,
  }
}

export {useFile}
