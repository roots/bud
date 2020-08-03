const useVueStyle = (rule, bud) => {
  const loader = bud.loaders.get('vueStyle')

  bud.logger.info({name: rule, loader}, `using vue-style-loader`)

  return ({loader})
}

export {useVueStyle}
