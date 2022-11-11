export default async bud => {
  bud
    .entry(`index.css`)
    .critical.html(`https://google.com`)
    .extract(false)
    .enable()
}
