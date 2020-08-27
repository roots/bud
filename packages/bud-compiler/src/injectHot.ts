const injectHot = ({config, bud}) => {
  Object.keys(config.entry).forEach(entry => {
    config.entry[entry] = [
      'webpack/hot/only-dev-server',
      `webpack-dev-server/client?http://localhost:3000`,
    ].concat(config.entry[entry])
  })

  return config
}

export {injectHot}
