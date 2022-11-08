type Target = HTMLAnchorElement | HTMLLinkElement | HTMLFormElement
type ElementTuple = [HTMLCollectionOf<Target>, any]

const intercept = (...args: [string, string]) => {
  args.every(arg => typeof arg === `string`) &&
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
              .filter(el => el.getAttribute(attribute).startsWith(args[0]))
              .map(el => {
                const value = el.getAttribute(attribute).replace(...args)
                el.setAttribute(attribute, value)
                el.toggleAttribute(`__bud_processed`)
              }),
          ),
      1000,
    )
}

export default intercept
