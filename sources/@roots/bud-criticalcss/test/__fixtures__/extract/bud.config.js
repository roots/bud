export default async bud => {
  await bud.extensions.add(`@roots/bud-criticalcss`)

  bud.entry(`index.css`)

  bud.critical
    .html(
      `<html>
        <body>
          <div class="foo"></div>
          <!-- the following should not included in generated critical stylesheet -->
          <div class="ignore-style">
            <div class="test"></div>
          </div>
        </body>
      </html>`,
    )
    .ignore({rule: [/\.ignore-style/]})
    .enable()
}
