const intercept = (...args: [string, string]) => {
  if (args.some(arg => typeof arg !== `string`)) return
  setInterval(
    () =>
      [
        [document.getElementsByTagName(`a`), `href`] as [
          HTMLCollectionOf<HTMLAnchorElement>,
          `href`,
        ],
        [document.getElementsByTagName(`link`), `href`] as [
          HTMLCollectionOf<HTMLLinkElement>,
          `href`,
        ],
      ]
        .map(
          ([elements, attribute]: [
            HTMLCollectionOf<HTMLAnchorElement | HTMLLinkElement>,
            `href`,
          ]): [Array<HTMLAnchorElement | HTMLLinkElement>, `href`] => [
            [...elements],
            attribute,
          ],
        )
        .forEach(([elements, attribute]) =>
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
