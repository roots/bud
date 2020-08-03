const useStyle = (rule: string, bud) => {
  const loader = bud.loaders.get('style')

  bud.logger.info({name: rule, loader}, `using style-loader`)

  return {loader}
}

export {useStyle}
