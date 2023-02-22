export default async bud => {
  bud.entry(`index.css`)
  bud.html({
    template: `./src/index.html`,
  })
  bud.critical
    .set(`src`, `./src/index.html`)
    .set(`extract`, false)
    .enable()
}
