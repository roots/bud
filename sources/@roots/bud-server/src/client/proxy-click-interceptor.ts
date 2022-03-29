type Target = HTMLAnchorElement | HTMLLinkElement | HTMLFormElement
type ElementTuple = [HTMLCollectionOf<Target>, any]

const main = async () => {
  const {headers} = await fetch(window.location.origin, {method: 'GET'})

  const bud = {
    proxy: new URL(headers.get('x-bud-proxy-origin')),
    dev: new URL(headers.get('x-bud-dev-origin')),
  }

  setInterval(
    () =>
      [
        [document.getElementsByTagName('a'), 'href'],
        [document.getElementsByTagName('link'), 'href'],
      ]
        .map(
          ([elements, attribute]: ElementTuple): [Array<Target>, any] => [
            Array.from(elements),
            attribute,
          ],
        )
        .forEach(([elements, attribute]: [Array<Target>, any]) =>
          elements
            .filter(el => el.hasAttribute(attribute))
            .filter(el => !el.hasAttribute('__bud_processed'))
            .filter(el => {
              const attr = el.getAttribute(attribute)
              return (
                attr.startsWith(bud.proxy.origin) &&
                !attr.startsWith(bud.dev.origin)
              )
            })
            .map(el => {
              const mutated = el
                .getAttribute(attribute)
                .replace(bud.proxy.origin, bud.dev.origin)

              el.setAttribute(attribute, mutated)
              el.setAttribute('__bud_processed', '')
            }),
        ),
    1000,
  )
}

;(async () =>
  window.requestAnimationFrame(async function ready() {
    return document.body
      ? await main()
      : window.requestAnimationFrame(ready)
  }))()
