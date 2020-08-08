const useResolveUrl = (rule, bud) => {
  const loader = bud.loaders.get('resolveUrl')

  const options = {
    sourceMap: bud.features.enabled('sourceMap'),
    debug: true,
  }

  bud.logger.info({name: rule, loader, options}, `using resolve-url-loader`)

  return {loader, options}
}

export {useResolveUrl}
