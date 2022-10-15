import {externalNetworkInterface} from '@roots/bud-support/os'

export const external = (host: string, protocol: string, port: string) => {
  return `${protocol}//${host}${port}`
}

export const internal = (host: string, protocol: string, port: string) => {
  const hostname =
    host === `0.0.0.0` || host === externalNetworkInterface.ipv4
      ? `localhost`
      : host

  return `${protocol}//${hostname}${port}`
}
