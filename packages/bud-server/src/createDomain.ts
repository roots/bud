import url from 'url'
import internalIp from 'internal-ip'

const createDomain = bud => {
  const options = bud.options.get('webpack.devServer')
  const protocol = bud.options.get('webpack.devServer.secure')
    ? 'https'
    : 'http'

  const port = options.socket ? 0 : options.port ? options.port : 3000
  const hostname = options.useLocalIp ? internalIp.v4() : options.host

  if (options.public) {
    return /^[a-zA-Z]+:\/\//.test(options.public)
      ? `${options.public}`
      : `${protocol}://${options.public}`
  }

  return url.format({protocol, hostname, port})
}

export {createDomain as default}
