/* eslint-disable no-console */

type Target = HTMLAnchorElement | HTMLLinkElement | HTMLFormElement
type ElementTuple = [HTMLCollectionOf<Target>, any]

const main = async (proxy = null) => {
  try {
    const {headers} = await fetch(window.location.href, {method: `GET`})
    proxy = new URL(headers.get(`x-bud-proxy-origin`)).href
  } catch (err) {
    return console.error(err)
  }

  try {
    setInterval(
      () =>
        [
          [document.getElementsByTagName(`a`), `href`],
          [document.getElementsByTagName(`link`), `href`],
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
              .filter(el => !el.hasAttribute(`__bud_processed`))
              .filter(el => el.getAttribute(attribute).startsWith(proxy))
              .map(el => {
                const value = el.getAttribute(attribute)
                console.info(
                  `replacing ${attribute} on ${el.tagName} with value of ${value}`,
                )
                el.setAttribute(attribute, value.replace(proxy, `/`))
                el.setAttribute(`__bud_processed`, ``)
              }),
          ),
      1000,
    )
  } catch (err) {
    return console.error(
      `There was a problem replacing hrefs in the proxied response. Exiting script early.`,
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
