export default async bud =>
  bud.html().entry({app: await bud.glob('*.{js,css}')})
