const injectHot = ({config, overlay, reload}) => {
  const client = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=${reload}&overlay=${overlay}`

  Object.keys(config.entry).forEach(entry => {
    config.entry[entry] = [client].concat(config.entry[entry])
  })

  return config
}

export {injectHot}
