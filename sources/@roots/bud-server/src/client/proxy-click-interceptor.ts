/* global __resourceQuery */
/* eslint-disable no-console, no-extra-semi */
// @ts-check

type Target = HTMLAnchorElement | HTMLLinkElement | HTMLFormElement
type ElementTuple = [HTMLCollectionOf<Target>, any]
type Collection = Array<ElementTuple>

type Task = [Array<Target>, any]

const collect = (): Collection => [
  [document.getElementsByTagName('a'), 'href'],
  [document.getElementsByTagName('link'), 'href'],
  [document.getElementsByTagName('form'), 'action'],
]

const main = async () => {
  const {headers} = await fetch(window.location.origin, {
    method: 'GET',
  })

  const origin = {
    proxy: headers.get('x-bud-proxy-origin'),
    dev: headers.get('x-bud-dev-origin'),
  }

  const normalize = ([elements, attribute]): [Array<Target>, any] => [
    Array.from(elements),
    attribute,
  ]

  const filter = ([elements, attribute]: [Array<Target>, any]) =>
    elements.filter(el =>
      el.getAttribute(attribute)?.includes(origin.proxy),
    ).length

  const mapElements = ([elements, attribute]: [Array<Target>, any]) => {
    elements.map(el => {
      const value = el.getAttribute(attribute)
      if (!value) return

      el.setAttribute(attribute, value.replace(origin.proxy, origin.dev))
    })
  }

  collect().map(normalize).filter(filter).map(mapElements)
}

;(async () =>
  window.requestAnimationFrame(async function ready() {
    return document.body
      ? await main()
      : window.requestAnimationFrame(ready)
  }))()
