export const boot = (bud: Framework.Bud): void => {
  const [Rules, Items] = bud.components.query(['rules', 'items'])

  const useCss = Rules.get('css.use')(bud)

  Rules.set('css.use', [
    ...useCss.splice(0, useCss.length - 1),
    Items.get('postcss').make(),
    ...useCss.splice(useCss.length - 1),
  ])
}
