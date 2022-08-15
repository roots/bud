type Target = HTMLAnchorElement | HTMLLinkElement | HTMLFormElement
type ElementTuple = [HTMLCollectionOf<Target>, any]

const intercept = (proxy: string = null) =>
  typeof proxy === 'string' &&
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
            .filter(el => el.getAttribute(attribute).startsWith(proxy))
            .map(el => {
              const value = el.getAttribute(attribute).replace(proxy, '/')
              el.setAttribute(attribute, value)
              el.toggleAttribute('__bud_processed')
            }),
        ),
    1000,
  )

export default intercept
