export default async bud => {
  bud
    .entry(`index.css`)
    .critical.html(
      `<html>
        <body>
          <div class="foo"></div>
          <div class="ignore-style">
            <div class="test"></div>
          </div>
        </body>
      </html>`,
    )
    .ignore({rule: [/\.ignore-style/]})
    .enable()
}
