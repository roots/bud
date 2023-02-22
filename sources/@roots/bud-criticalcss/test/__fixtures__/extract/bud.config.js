export default async bud => {
  await bud.extensions.add(`@roots/bud-criticalcss`)

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
    .set(`ignore`, {rule: [/\.ignore-style/]})
    .enable()
}
