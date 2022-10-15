import {networkInterfaces} from 'node:os'

export const ipv4 =
  Object.values(networkInterfaces())
    .flat()
    .find(i => i?.family === `IPv4` && !i?.internal)?.address || `0.0.0.0`

export const ipv4Url = new URL(`http://${ipv4}`)
