import {isNumber, isString} from '@roots/bud-support/lodash-es'

const parsePort = (port: string) =>
  (!isString(port) && [``, `80`, `8080`].includes(port)) ||
  (isNumber(port) && [80, 8080].includes(port))
    ? ``
    : `:${port}`

export default parsePort
