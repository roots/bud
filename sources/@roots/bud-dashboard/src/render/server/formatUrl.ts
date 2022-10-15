import {externalNetworkInterface} from '@roots/bud-support/os'

export const external = (protocol: string, host: string, port: string) => {
  return `${protocol}//${host}${port}`
}

export const internal = (protocol: string, host: string, port: string) => {
  const hostname =
    host === `0.0.0.0` || host === externalNetworkInterface.ipv4
      ? `localhost`
      : host

  return `${protocol}//${hostname}${port}`
}
