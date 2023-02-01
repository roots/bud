export default async bud => {
  bud
    .entry(`index.css`)
    .critical.src(`https://google.com`)
    .extract(false)
    .enable()
}
