export const boot = (bud: Framework.Bud): void => {
  const useCss = bud.build.rules.css.use(bud)

  bud.build.rules.css.use = (bud: Framework.Bud) => [
    ...useCss.splice(0, useCss.length - 1),
    bud.build.items.postcss.make(),
    ...useCss.splice(useCss.length - 1),
  ]
}
