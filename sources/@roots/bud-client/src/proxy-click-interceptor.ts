/* eslint-disable no-console */
/* global __resourceQuery */

type Target = HTMLAnchorElement | HTMLLinkElement | HTMLFormElement
type ElementTuple = [HTMLCollectionOf<Target>, any]

const main = async (proxy: string = null) => {
  proxy = proxy ?? new URLSearchParams(__resourceQuery).get('href')
  proxy = decodeURI(proxy)

  try {
    setInterval(
      () =>
        [
          [document.getElementsByTagName('a'), 'href'],
          [document.getElementsByTagName('link'), 'href'],
        ]
          .map(
            ([elements, attribute]: ElementTuple): [
              Array<Target>,
              any,
            ] => [Array.from(elements), attribute],
          )
          .forEach(([elements, attribute]: [Array<Target>, any]) =>
            elements
              .filter(el => el.hasAttribute(attribute))
              .filter(el => !el.hasAttribute('__bud_processed'))
              .filter(el => el.getAttribute(attribute).startsWith(proxy))
              .map(el => {
                const value = el
                  .getAttribute(attribute)
                  .replace(proxy, '/')
                el.setAttribute(attribute, value)
                el.toggleAttribute('__bud_processed')
              }),
          ),
      1000,
    )
  } catch (err) {
    return console.error(
      `[bud] there was a problem replacing hrefs in the proxied response.`,
      err,
    )
  }
}

;(async () =>
  window.requestAnimationFrame(async function ready() {
    return document.body
      ? await main()
      : window.requestAnimationFrame(ready)
  }))()
