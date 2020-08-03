const useMiniCss = (rule, bud) => {
  const isHot = bud.features.enabled('hot')
  const loader = bud.loaders.get('miniCss')
  const options = {
    hot: isHot,
  }

  bud.logger.info({name: rule, loader, options, isHot}, `using mini-css`)

  return {loader, options}
}

export {useMiniCss}
