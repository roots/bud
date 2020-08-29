const injectEntrypoints: (domain: string, options: any) => any = (
  domain,
  options,
) => {
  const client = [
    options.devServer.hotOnly
      ? 'webpack/hot/only-dev-server'
      : 'webpack/hot/dev-server',
    `webpack-hot-middleware/client?${domain}/__webpack_hmr`,
  ]

  const prepend = entry => {
    if (typeof entry === 'function') {
      return () => Promise.resolve(entry()).then(prepend)
    }

    if (typeof entry === 'object' && !Array.isArray(entry)) {
      const entryClone = {}
      Object.keys(entry).forEach(key => {
        entryClone[key] = client.concat(entry[key])
      })

      return entryClone
    }
  }

  return prepend(options.entry)
}

export {injectEntrypoints as default}
