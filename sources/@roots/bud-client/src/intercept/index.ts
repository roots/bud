const intercept = (search: string, replace: string) => {
  setInterval(
    () =>
      [
        ...document.getElementsByTagName(`a`),
        ...document.getElementsByTagName(`link`),
      ].forEach(element => {
        if (element.hasAttribute(`__bud_processed`)) return
        if (!element.hasAttribute(`href`)) return
        if (!element.getAttribute(`href`)?.startsWith(search)) return

        const value = element
          .getAttribute(`href`)
          ?.replace(search, replace)

        if (!value) return

        element.setAttribute(`href`, value)
        element.toggleAttribute(`__bud_processed`)
      }),
    1000,
  )
}

export default intercept
