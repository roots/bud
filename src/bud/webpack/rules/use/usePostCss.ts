const usePostCss = (rule, bud) => {
  const loader = bud.loaders.get('postCss')
  let options: any = {
    ident: 'postcss',
  }

  if (bud.features.enabled('scss')) {
    options = {
      parser: 'postcss-scss',
    }

    bud.logger.info(
      {name: rule, options},
      `scss support enabled. using postcss-scss parser.`,
    )
  }

  options = {
    ...options,
    ...bud.options.get('postCss'),
  }

  bud.logger.info({name: rule, loader, options}, `using postcss-loader`)

  return {loader, options}
}

export {usePostCss}
