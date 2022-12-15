import parsePort from './parsePort.js'

export const formatUrl = (url: URL): URL['origin'] => {
  if (url.hostname === `0.0.0.0`) {
    url.hostname = `localhost`
  }

  url.port = parsePort(url.port)

  return url.origin
}
