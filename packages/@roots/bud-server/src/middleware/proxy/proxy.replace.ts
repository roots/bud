import {URL} from 'url'

export const window = (
  proxy: URL,
  dev: URL,
): [string | RegExp, string] => {
  return [
    new RegExp(
      `window\\.location([\\[|\\.]['|"]?.*['|"]?\\]?)\\s*?=\\s*?['|"]${proxy.origin}(.*)['|"]`,
      'g',
    ),
    `window.location$1 = "${dev.origin}$2"`,
  ]
}

export const href = (
  proxy: URL,
  dev: URL,
): [string | RegExp, string] => {
  return [
    new RegExp(
      `<a(.*)?href=['|"]${proxy.origin}(.*)?['|"]`,
      'g',
    ),
    `<a$1href="${dev.origin}$2"`,
  ]
}
