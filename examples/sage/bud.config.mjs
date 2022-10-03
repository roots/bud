export default async app => {
  app
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
    })
    .copy('images')
    .watch(['resources/views/*.blade.php'])
    .serve(3000)
    .proxy('http://example.test')
    .wpjson.useTailwindColors(true)
    .useTailwindFontFamily()
    .useTailwindFontSize()
    .enable()
}
