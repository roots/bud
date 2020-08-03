const usePostCss = (rule, bud) => {
  const loader = bud.loaders.postCss
  const options = {
    ident: 'postcss',
    parser: 'postcss-scss',
    ...bud.options.get('postCss'),
  }

  bud.logger.info({name: rule, loader, options}, `using postcss-loader`)

  return {loader, options}
}

export {usePostCss}
