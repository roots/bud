const moduleOptions = {
  modules: true,
  onlyLocals: false,
}

const useCss = (rule: string, bud, modular?: boolean) => {
  const loader = bud.loaders.get('css')
  const options = modular ? moduleOptions : null

  bud.logger.info({name: rule, loader}, `using css-loader`)

  if (!options) {
    return {loader}
  }

  bud.logger.info({name: rule, options}, `css-loader configured for css modules`)

  return {loader, options}
}

export {useCss}
