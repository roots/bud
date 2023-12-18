// @ts-check

/**
 * @param {import('@roots/bud').Bud} bud
 */
export default async bud => {
  bud
    .entry({
      app: ['@scripts/app', '@styles/app'],
      editor: ['@scripts/editor', '@styles/editor'],
    })
    .copyDir('images')
    .watch(['resources/views/*.blade.php'])
    .serve(3000)
    .proxy('http://example.test')

  bud.wpjson
    .useTailwindColors(false)
    .useTailwindFontFamily()
    .useTailwindFontSize()
}
