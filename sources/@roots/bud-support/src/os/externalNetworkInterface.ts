import {networkInterfaces} from 'node:os'

export const ipv4 = Object.values(networkInterfaces())
  .flat()
  .find(i => i?.family === `IPv4` && !i?.internal)?.address

export const ipv4Url = (ip: string) => new URL(`http://${ip}`)
