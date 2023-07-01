export default async bud => {
  bud
    .entry(`app`, [`scripts/index`, `scripts/scripts`, `styles/app`])
    .watch([bud.path(`@src`, `images`)])
    .serve(3015)
    .html()
    .alias(`foo`, false)
}
