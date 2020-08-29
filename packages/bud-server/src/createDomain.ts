import url from 'url'
import internalIp from 'internal-ip'

const createDomain = (options, app) => {
  const protocol = options.https ? 'https' : 'http'
  const port = options.socket ? 0 : options.port ?? app.port ?? 0
  const hostname = options.useLocalIp ? internalIp.v4() : options.host

  if (options.public) {
    return /^[a-zA-Z]+:\/\//.test(options.public)
      ? `${options.public}`
      : `${protocol}://${options.public}`
  }

  return url.format({protocol, hostname, port})
}

export {createDomain as default}
