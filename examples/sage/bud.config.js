export default async app => {
  app
    .entry({
      app: ['@scripts/app', '@styles/app'],
      editor: ['@scripts/editor', '@styles/editor'],
    })
    .copyDir('images')
    .watch(['resources/views/*.blade.php'])
    .serve(3000)
    .proxy('http://example.test')

  app.wpjson
    .useTailwindColors(true)
    .useTailwindFontFamily()
    .useTailwindFontSize()
}
