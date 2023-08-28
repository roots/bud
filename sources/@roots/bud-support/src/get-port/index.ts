import isArray from '@roots/bud-support/lodash/isArray'
import isString from '@roots/bud-support/lodash/isString'
import getPort from 'get-port'

/**
 * Get a free port
 */
const requestPorts = async (
  include: Array<number | string> | number | string,
  exclude: Array<number | string> | number | string = [],
) => {
  const normalizedRequest = {
    exclude: portOrPortsToNumbers(exclude),
    port: portOrPortsToNumbers(include),
  }

  const port = await getPort(normalizedRequest)

  return `${port}`
}

/**
 * Convert a string, number, or array of strings/numbers
 * to an array of numbers
 */
const portOrPortsToNumbers = (
  port: Array<number | string> | number | string,
): Array<number> =>
  isArray(port)
    ? port.map(port => (isString(port) ? parseInt(port) : port))
    : [isString(port) ? parseInt(port) : port]

export {getPort, portOrPortsToNumbers, requestPorts}
