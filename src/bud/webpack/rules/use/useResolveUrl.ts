const useResolveUrl = (rule, bud) => {
  const loader = bud.loaders.get('resolveUrl')

  const options = {
    engine: null,
    sourceMap: bud.features.enabled('sourceMap'),
    debug: true,
  }

  if (bud.features.enabled('postCss')) {
    options.engine = 'postcss'
    bud.logger.info(
      {name: rule, engine: options.engine},
      `postcss enabled. resolve-url-loader is using postcss engine.`,
    )
  }

  bud.logger.info({name: rule, loader, options}, `using resolve-url-loader`)

  return {loader, options}
}

export {useResolveUrl}
