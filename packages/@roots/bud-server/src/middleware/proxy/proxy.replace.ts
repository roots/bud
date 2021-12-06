import {URL} from 'url'

export const replace =
  (proxy: URL, dev: URL) =>
  (): Array<[string | RegExp, string]> => {
    const replacements = []

    /**
     * Replace href attributes containing proxied origin
     */
    replacements.push([
      new RegExp(`href=['|"]${proxy.origin}(.*)['|"]`, 'g'),
      `href="${dev.origin}$1"`,
    ])

    /**
     * Replace window.location assignments containing proxied origin
     */
    replacements.push(
      [
        new RegExp(
          `window\\.location\\[['|"](.*)['|"]\\]\s*?=\s*?"${proxy.origin}(.*)"`,
          'g',
        ),
        `window.location[$1] = "${dev.origin}$2"`,
      ],
      [
        new RegExp(
          `window\\.location\\.(.*)\s*?=\s*?['|"]${proxy.origin}(.*)['|"]`,
          'g',
        ),
        `window.location.$1 = "${dev.origin}$2"`,
      ],
    )

    return replacements
  }
