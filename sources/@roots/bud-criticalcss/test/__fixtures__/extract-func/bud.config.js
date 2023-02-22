export default async bud => {
  bud.entry(`index.css`)

  bud.critical.set(
    `html`,
    `<html>
        <body>
          <div class="foo"></div>
          <div class="ignore-style">
            <div class="test"></div>
          </div>
        </body>
      </html>`,
  )

  bud.extractCss([bud.path(`@dist/css/app.css`)])
  bud.extractCss([bud.path(`@dist/css/editor.css`)], {
    extract: false,
    width: 900,
  })
}
