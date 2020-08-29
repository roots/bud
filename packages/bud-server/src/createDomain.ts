import url from 'url'

const createDomain = bud => {
  const {secure, socket, port, host} = bud.options.get(
    'webpack.devServer',
  )

  return url.format({
    protocol: secure ? 'https' : 'http',
    hostname: /^[a-zA-Z]+:\/\//.test(host)
      ? host.replace(/^[a-zA-Z]+:\/\//, '')
      : host,
    port: socket ? 0 : port ? port : 3000,
  })
}

export {createDomain as default}
